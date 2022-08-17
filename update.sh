#!/bin/bash
cd img;
identify -format "%f %wx%h\n" *.jpg *.png > ../dims.txt
cd -
node get_dimensions.js
node get_citations.js
npx prettier --write LINKS.json
