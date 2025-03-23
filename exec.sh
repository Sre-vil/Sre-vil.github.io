#!/bin/bash

# 현재 디렉토리에서 package.json을 _site로 복사
cp package.json _site/

# Jekyll 서버 실행
bundle exec jekyll serve