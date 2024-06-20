#!/bin/bash
git checkout master
git pull origin master
git checkout prod
git merge master
git push origin prod


