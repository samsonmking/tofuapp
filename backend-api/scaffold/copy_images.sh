#!/bin/bash
set -e

image_serve="./images"

echo "[INFO] copying images"
rm -rf $image_serve
mkdir -p $image_serve
cp -r ./scaffold/seed_images/* $image_serve