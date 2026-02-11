#!/usr/bin/env -S bash -e

_yellow="\e[4;93m"
_nc="\e[0m"
_build=📦
_start="▶️ "

echo -e "${_build} ${_yellow}Building${_nc}:\n"
./Dockerfile

echo -e "\n${_start} ${_yellow}Starting${_nc}:\n"
docker container rm --force nfld-backend > /dev/null 2>&1
docker container run --rm --name nfld-backend --publish 5555:5555 --env TZ=America/Chicago --detach --network=nfld_default nfld-backend

unset _yellow
unset _nc
unset _build
unset _start
