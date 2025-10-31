# NFLd

### Backend:
```bash
python3 -m venv .venv
source .venv/bin/activate
cd backend
pip install -r requirements.txt
python3 api.py &
deactivate
cd ..
```

### Frontend:
```bash
#npm create vite@latest frontend -- --template react-ts
cd frontend
npm ci
npm run dev
```
