# NFLd

### Backend:
```bash
python3 -m venv .venv
source .venv/bin/activate
cd backend
pip-compile --extra dev
pip-sync
python3 api.py &
deactivate
cd ..
```

### Frontend:
```bash
cd frontend
pnpm i
pnpm run dev
```
