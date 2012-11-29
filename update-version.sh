#!/bin/bash
revisioncount=`git log --oneline | wc -l | tr -d ' '`
projectversion=`git describe --tags --long`
cleanversion=${projectversion%%-*}
appname='nvzn'

#echo "$projectversion-$revisioncount"
#echo "$cleanversion.$revisioncount"

sed -e "s/VERSION: '[0-9a-zA-Z\.-]*'/VERSION: '`echo "$projectversion-$revisioncount"`'/" -i .bak apps/$appname/core.js
