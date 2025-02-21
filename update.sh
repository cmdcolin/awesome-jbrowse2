#!/bin/bash
cd img;
identify -format "%f %wx%h\n" *.jpg *.jpeg *.png > ../dims.txt
cd -
node get_dimensions.js
node get_citations.js
node gen_readme.js > README.md
npx prettier --write LINKS.json
