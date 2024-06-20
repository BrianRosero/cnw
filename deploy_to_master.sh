@echo off
git checkout dev
git pull origin dev
git checkout master
git merge dev
git push origin master