#!/bin/bash
#TODO cd %~dp0
#TODO cd ..
# "c:\Program Files\7-Zip\7z.exe" a build\reversi.zip @build/files.txt
pwd

zip build/reversi101.zip -@ < build/files.txt
# pause
# rem sous linux: zip -r app .
