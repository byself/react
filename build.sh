#!/usr/bin/env bash

baseDir=`pwd`

cd client
yarn install
yarn build:dev

cd ${baseDir}

mkdir -p ${baseDir}/server/public/
cp -r ${baseDir}/client/dist/* ${baseDir}/server/public/
cd server
yarn install
