ifndef VERBOSE
.SILENT:
endif

override CURRENT_DIR = $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
override DOCKER_MOUNT_SUFFIX ?= consistent
override DOCKER_COMPOSE_ARGS ?= -f deployments/docker-compose/docker-compose.yml -f deployments/docker-compose/docker-compose-local.yml
override DOCKER_BUILD_ARGS ?= -f ${ROOT_DIR}/deployments/build/docker/app/Dockerfile

TAG ?= latest
CACHE_TAG ?= unknown_cache
DIND_UID ?= 0
DING_GUID ?= 0

ifeq ($(GO111MODULE),auto)
override GO111MODULE = on
endif

ifeq ($(OS),Windows_NT)
override ROOT_DIR = $(shell echo $(CURRENT_DIR) | sed -e "s:^/./:\U&:g")
else
override ROOT_DIR = $(CURRENT_DIR)
endif

define node_docker
	. ${ROOT_DIR}/scripts/common.sh ${ROOT_DIR}/scripts ;\
	docker run --rm \
		-v /${ROOT_DIR}:/${ROOT_DIR}:${DOCKER_MOUNT_SUFFIX} \
		-w /${ROOT_DIR} \
		-e GO111MODULE=on \
		$${NODE_IMAGE}:$${NODE_IMAGE_TAG} \
		sh -c 'TAG=${TAG} $(subst ",,${1}); if [ "${DIND_UID}" != "0" ]; then chown -R ${DIND_UID}:${DIND_GUID} ${ROOT_DIR}; fi'
endef

build: ## build application
	if [ "${DIND}" = "1" ]; then \
		$(call node_docker,"make build") ;\
    else \
		. ${ROOT_DIR}/scripts/common.sh ${ROOT_DIR}/scripts ;\
        yarn && yarn build ;\
    fi;
.PHONY: build

build-jenkins: build ## build in jenkins
.PHONY: build-jenkins

clean: ## remove generated files, tidy vendor dependencies
	if [ "${DIND}" = "1" ]; then \
		$(call node_docker,"make clean") ;\
    else \
    	rm -rf node_modules ;\
    	rm -rf build ;\
    fi;
.PHONY: clean

dev-build-up: build docker-image-cache dev-docker-compose-up ## create new build and recreate containers in docker-compose
.PHONY: dev-build-up

dev-docker-compose-down: ## stop and remove containers, networks, images, and volumes
	. ${ROOT_DIR}/scripts/common.sh ${ROOT_DIR}/scripts ;\
	TAG=${TAG} DOCKER_NETWORK=$${DOCKER_NETWORK} docker-compose -p $${PROJECT_NAME} ${DOCKER_COMPOSE_ARGS} down -v  ;\
	(docker network inspect $${DOCKER_NETWORK} &>/dev/null && \
	(echo "Delete docker network" && docker network rm $${DOCKER_NETWORK}) || echo "Docker network \"$${DOCKER_NETWORK}\" already deleted")
.PHONY: dev-docker-compose-down

dev-docker-compose-up: ## create and start containers
	. ${ROOT_DIR}/scripts/common.sh ${ROOT_DIR}/scripts ;\
	(docker network inspect $${DOCKER_NETWORK} >/dev/null && echo "Docker network \"$${DOCKER_NETWORK}\" already created") || \
	(echo "Create docker network \"$${DOCKER_NETWORK}\"" && docker network create $${DOCKER_NETWORK})  ;\
	TAG=${TAG} DOCKER_NETWORK=$${DOCKER_NETWORK} docker-compose -p $${PROJECT_NAME} ${DOCKER_COMPOSE_ARGS} up -d
.PHONY: dev-docker-compose-up

dev-docker-compose-recreate: dev-docker-compose-down ## pull newest version of containers and start containers
	. ${ROOT_DIR}/scripts/common.sh ${ROOT_DIR}/scripts ;\
	(docker network inspect $${DOCKER_NETWORK} >/dev/null && echo "Docker network \"$${DOCKER_NETWORK}\" already created") || \
	(echo "Create docker network \"$${DOCKER_NETWORK}\"" && docker network create $${DOCKER_NETWORK})  ;\
	TAG=${TAG} DOCKER_NETWORK=$${DOCKER_NETWORK} docker-compose -p $${PROJECT_NAME} ${DOCKER_COMPOSE_ARGS} pull --ignore-pull-failures && \
	TAG=${TAG} DOCKER_NETWORK=$${DOCKER_NETWORK} docker-compose -p $${PROJECT_NAME} ${DOCKER_COMPOSE_ARGS} up -d
.PHONY: dev-docker-compose-recreate

dev-test: test lint ## test application in dev env with race and lint
.PHONY: dev-test

dind: ## useful for windows
	if [ "${DIND}" = "1" ]; then \
		echo "Already in DIND" ;\
    else \
	    . ${ROOT_DIR}/scripts/common.sh ${ROOT_DIR}/scripts ;\
	    docker rm -f dind-$${PROJECT_NAME} &>/dev/null ;\
	    docker run -it --rm --name dind-$${PROJECT_NAME} --privileged \
            -v //var/run/docker.sock://var/run/docker.sock:${DOCKER_MOUNT_SUFFIX} \
            -v /${ROOT_DIR}:/${ROOT_DIR}:${DOCKER_MOUNT_SUFFIX} \
            -w /${ROOT_DIR} \
            $${DIND_IMAGE}:$${DIND_IMAGE_TAG} ;\
    fi;
.PHONY: dind

docker-clean: ## delete previous docker image build
	. ${ROOT_DIR}/scripts/common.sh ${ROOT_DIR}/scripts ;\
	docker rmi $${DOCKER_IMAGE}:${CACHE_TAG} || true ;\
	docker rmi $${DOCKER_IMAGE}:${TAG} || true
.PHONY: docker-clean

docker-image-cache: ## build docker image and tagged as cache
	. ${ROOT_DIR}/scripts/common.sh ${ROOT_DIR}/scripts ;\
	docker build --cache-from $${DOCKER_IMAGE}:${CACHE_TAG} ${DOCKER_BUILD_ARGS} -t $${DOCKER_IMAGE}:${TAG} -t $${DOCKER_IMAGE}:${CACHE_TAG} ${ROOT_DIR}
.PHONY: docker-image-cache

docker-image: ## build docker image
	. ${ROOT_DIR}/scripts/common.sh ${ROOT_DIR}/scripts ;\
	docker build --cache-from $${DOCKER_IMAGE}:${CACHE_TAG} ${DOCKER_BUILD_ARGS} -t $${DOCKER_IMAGE}:${TAG} ${ROOT_DIR}
.PHONY: docker-image

docker-image-jenkins: docker-image ## build in jenkins
.PHONY: docker-image-jenkins

docker-push: ## push docker image to registry
	. ${ROOT_DIR}/scripts/common.sh ${ROOT_DIR}/scripts ;\
	docker push $${DOCKER_IMAGE}:${TAG}
.PHONY: docker-push

github-build: docker-image docker-push docker-clean ## build application in CI
.PHONY: github-build

github-test: test ## test application in CI
.PHONY: github-test

lint: ## execute linter
	if [ "${DIND}" = "1" ]; then \
		$(call node_docker,"make lint") ;\
    else \
        CI=true yarn lint;\
    fi;
.PHONY: lint

test: ## test application with race
	if [ "${DIND}" = "1" ]; then \
		$(call node_docker,"make test") ;\
    else \
		CI=true yarn test --passWithNoTests;\
    fi;
.PHONY: test

# AWS_ACCESS_KEY_ID=minioadmin
# AWS_SECRET_ACCESS_KEY=minioadmin
# AWS_S3_ENDPOINT=http://localgost:9000
# AWS_S3_BUCKET=test-update
# FORSE_CODE_SIGNING = false
# Codesign on CI https://www.electron.build/code-signing#travis-appveyor-and-other-ci-servers
# CSC_LINK  - The HTTPS link (or base64-encoded data, or file:// link, or local path) to certificate (*.p12 or *.pfx file). Shorthand ~/ is supported (home directory).
# CSC_KEY_PASSWORD - The password to decrypt the certificate given in CSC_LINK.
.PHONY: publish
publish: ## publish launcher
	yarn
	yarn preelectron-pack
	yarn electron-builder build -w --config.publish.provider=s3 \
	  --config.publish.endpoint=${AWS_S3_ENDPOINT} \
	  --config.publish.bucket=${AWS_S3_BUCKET} \
	  --config.publish.region=${AWS_S3_REGION} \
	  --config.forceCodeSigning=$${FORSE_CODE_SIGNING:-true} \
	  --publish always

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
.PHONY: help

.DEFAULT_GOAL := help