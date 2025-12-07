#!/usr/bin/env -S bash -e

EOL="\e[0m"
GREEN="\e[1;32m"
RED="\e[1;4;31m"
YELLOW="\e[1;33m"

clear

echo -e "${RED}=> NGINX <=${EOL}\n"

echo -e "${GREEN}=> Creating image...${EOL}\n"
./Dockerfile

echo -e "\n${YELLOW}=> Done!${EOL}\n"

unset EOL
unset GREEN
unset RED
unset YELLOW
