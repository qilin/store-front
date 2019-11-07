#!/usr/bin/env sh

set -e

/docker/bin/env.sh

exec nginx -g "daemon off;"