#!/usr/bin/env -S bash -e

pushd backend > /dev/null || exit
./build.sh
popd > /dev/null || exit

pushd frontend > /dev/null || exit
./build.sh
popd > /dev/null || exit

# shellcheck disable=SC2162
read -p "Run Docker Compose (Y/n)? " answer
if [ "$answer" == "y" ] || [ "$answer" == "Y" ] || [ -z "$answer" ]; then
    docker compose up -d
else
    echo -e "\n"
fi
