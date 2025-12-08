#!/usr/bin/env -S bash -e

EOL="\e[0m"
GREEN="\e[1;32m"
RED="\e[1;4;31m"
YELLOW="\e[1;33m"

clear

echo -e "${RED}=> BACKEND <=${EOL}\n"

echo -e "${GREEN}=> Activating virtual environment...${EOL}\n"
source .venv/bin/activate

echo -e "${GREEN}=> Gathering dependencies...${EOL}\n"
pip-compile --extra dev --quiet

echo -e "${GREEN}=> Installing dependencies...${EOL}\n"
pip-sync --quiet

echo -e "${GREEN}=> Linting API...${EOL}"
./lint.sh

echo -e "${GREEN}=> Running tests...${EOL}\n"
./test.sh

echo -e "\n${GREEN}=> Deactivating virtual environment...${EOL}\n"
deactivate

echo -e "${GREEN}=> Creating image...${EOL}\n"
./Dockerfile

echo -e "\n${YELLOW}=> Done!${EOL}\n"

unset EOL
unset GREEN
unset RED
unset YELLOW
