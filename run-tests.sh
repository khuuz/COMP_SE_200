#/bin/sh

if [ ! -d node_modules ]
then
    npm ci
fi

npm test
