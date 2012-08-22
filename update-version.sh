#!/bin/bash
revisioncount=`git log --oneline | wc -l | tr -d ' '`
projectversion=`git describe --tags --long`
cleanversion=${projectversion%%-*}

#echo "$projectversion-$revisioncount"
#echo "$cleanversion.$revisioncount"

sed -e "s/VERSION: '[0-9a-zA-Z\.-]*'/VERSION: '`echo "$projectversion-$revisioncount"`'/" -i .bak apps/nvzn/core.js
