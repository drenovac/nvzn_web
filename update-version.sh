#!/bin/bash
revisioncount=`git log --oneline | wc -l | tr -d ' '`
projectversion=`git describe --tags --long`
cleanversion=${projectversion%%-*}
appname='nvzn'

#echo "$projectversion-$revisioncount"
#echo "$cleanversion.$revisioncount"

sed -e "s/VERSION: '[0-9a-zA-Z\.-]*'/VERSION: '`echo "$projectversion-$revisioncount"`'/" -i .bak apps/$appname/core.js

sproutcore build nvzn -r --languages='en'
version=`sproutcore build-number nvzn`

# Copy the server code
cp -Rf server/ ../nvzn_build
# remove the existing static if any
rm -rf ../nvzn_build/static

# (re)Make the folders if needed
mkdir -p ../nvzn_build/static/sproutcore

# Copy our app
wd=`pwd`
#cp -Rf tmp/build/static/nvzn ../nvzn_build/static/nvzn
rsync -r tmp/build/static/nvzn/ ../nvzn_build/static/nvzn

# Copy the images from SC
cd tmp/build/static/sproutcore
tar -cf - `find -E . -regex ".*(png|gif|jpg|ico)$"` | tar -C ../../../../../nvzn_build/static/sproutcore -xf -

# Back to root
cd $wd

# Set the right version number.
sproutcore build-number nvzn > ../nvzn_build/VERSION

echo "New version is "
cat ../nvzn_build/VERSION