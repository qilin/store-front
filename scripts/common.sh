#!/usr/bin/env sh

if [ -n "$1" ] && [ ${0:0:4} = "/bin" ]; then
  ROOT_DIR=$1/..
else
  ROOT_DIR="$( cd "$( dirname "$0" )" && pwd )/.."
fi

NODE_IMAGE=node
NODE_IMAGE_TAG=latest
DIND_IMAGE=p1hub/dind
DIND_IMAGE_TAG=latest
DOCKER_NETWORK="p1devnet"
DOCKER_IMAGE=p1hub/qilin-crm-dashboard
PROJECT_NAME="qilin-crm-dashboard"