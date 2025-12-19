#!/usr/bin/env -S bash -e

EOL="\e[0m"
GREEN="\e[1;32m"
RED="\e[1;4;31m"
YELLOW="\e[1;33m"

clear

echo -e "${RED}=> FRONTEND <=${EOL}\n"

echo -e "${GREEN}=> Installing dependencies...${EOL}\n"
pnpm install --frozen-lockfile

echo -e "\n${GREEN}=> Linting...${EOL}"
pnpm run lint

echo -e "\n${GREEN}=> Running tests...${EOL}"
pnpm run test

echo -e "${GREEN}=> Creating image...${EOL}\n"
NODE_VER=$(node --version | cut -d "." -f 1)
NODE=${NODE_VER:1}
docker build --build-arg NODE="$NODE" --build-arg PNPM="$(pnpm --version)" --tag=nfld-frontend .
unset NODE_VER
unset NODE

echo -e "\n${YELLOW}=> Done!${EOL}\n"

unset EOL
unset GREEN
unset RED
unset YELLOW
