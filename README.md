# Compose flowchart

```mermaid
flowchart LR
frontend@{shape: rounded, label: "frontend"}
frontendPort@{shape: rounded, label: "http://localhost:8888"}
backend@{shape: rounded, label: "backend (direct)"}
backendPort@{shape: rounded, label: "http://localhost:5555"}
nginx@{shape: rounded, label: "nginx (entrypoint)"}
nginxPort@{shape: rounded, label: "http://localhost:88"}
frontend-->frontendPort
backend-->backendPort
nginx-->nginxPort
```

___

# Development stuff

### Backend:
```bash
python3 -m venv .venv
source .venv/bin/activate
cd backend
pip-compile --extra dev
pip-sync
python3 api.py &
deactivate
```

### Frontend:
```bash
cd frontend
pnpm i
pnpm run dev
```

# Docker stuff

### To build images:

```bash
# All
./build.sh

# Backend
cd backend && ./build.sh
# or
cd backend && ./Dockerfile

# Frontend
cd frontend && ./build.sh
# or
cd frontend && ./Dockerfile

# Nginx
cd nginx && ./build.sh
# or
cd nginx && ./Dockerfile
```

# Nginx stuff

```nginx
server {
    include ssl_params;
    server_name [sub].[domain].com;
    location / {
        proxy_pass http://0.0.0.0:88;
        include proxy_params;
    }
}
```
