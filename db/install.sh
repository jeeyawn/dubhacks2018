#!/bin/sh
cd ~
wget https://nodejs.org/dist/v10.12.0/node-v10.12.0.tar.gz
tar xvf node-v10.12.0-linux-x64.tar.xz
mv node-v10.12.0-linux-x64 nodejs
mkdir ~/bin
cp nodejs/bin/node ~/bin
cd ~/bin
ln -s ../nodejs/lib/node_modules/npm/bin/npm-cli.js npm
node --version
npm --version

cd /home/dubhacks2018/dubhacks2018/dubhacks2018/db
npm install -save