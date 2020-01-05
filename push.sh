#!/bin/bash
set -e

push_front='false'
push_back='false'

while getopts 'fb' flag; do
    case "${flag}" in
        f) push_front='true' ;;
        b) push_back='true' ;;
    esac
done

if [[ $push_front == 'true' ]]; then
    echo "[Build] docker.pkg.github.com/samsonmking/tofuapp/frontend"
    docker build ./frontend -t docker.pkg.github.com/samsonmking/tofuapp/frontend
    echo "[Push] docker.pkg.github.com/samsonmking/tofuapp/frontend"
    docker push docker.pkg.github.com/samsonmking/tofuapp/frontend
fi

if [[ $push_back == 'true' ]]; then
    echo "[Build] docker.pkg.github.com/samsonmking/tofuapp/app"
    docker build ./backend-api -t docker.pkg.github.com/samsonmking/tofuapp/app
    echo "[Push] docker.pkg.github.com/samsonmking/tofuapp/app"
    docker push docker.pkg.github.com/samsonmking/tofuapp/app
fi