#!/bin/bash
git checkout deb
git pull origin deb
git checkout master
git merge deb
git push origin master