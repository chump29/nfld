# <img src="./frontend/public/nfld.png" title="NFLd" alt="NFLd logo" width="64" height="64"> NFLd

> - Choose an NFL team, year, and season schedule
> - Full NFL schedule information will be displayed

---

#### Docker Compose Flow:

```mermaid
flowchart LR
frontend@{shape: rounded, label: "nfld-frontend:80"}
frontendPort@{shape: rounded, label: "http://localhost:88"}
backend@{shape: rounded, label: "nfld-backend:5555"}
backendPort@{shape: rounded, label: "http://localhost:5555"}
frontend-->frontendPort
backend-->backendPort
```

---

#### To build all images:

```bash
./build.sh
```

---

### Additional documentation available:

- [Frontend](./backend/README.md "Frontend")
- [Backend](./frontend/README.md "Backend")
