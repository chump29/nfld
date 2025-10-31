#!/usr/bin/env -S bash -e

EOL="\e[0m"
GREEN="\e[1;32m"
RED="\e[1;4;31m"

clear

echo -e "${RED}=> FRONTEND <=${EOL}\n"

echo -e "${GREEN}=> Building...${EOL}"
pnpm run prod

echo -e "\n${GREEN}=> Creating image...${EOL}\n"
./Dockerfile

echo -e "\n${GREEN}=> Done!${EOL}\n"

unset EOL
unset GREEN
unset RED
