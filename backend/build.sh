#!/usr/bin/env -S bash -e

EOL="\e[0m"
GREEN="\e[1;32m"
RED="\e[1;4;31m"

clear

echo -e "${RED}=> BACKEND <=${EOL}\n"

echo -e "${GREEN}=> Creating image...${EOL}\n"
./Dockerfile

echo -e "\n${GREEN}=> Done!${EOL}\n"

unset EOL
unset GREEN
unset RED
