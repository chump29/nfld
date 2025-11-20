# NFLd stuff

### To run `api.py`:

```bash
./api.py
# or
python3 api.py
```

### To build standalone Docker image:

```bash
./build.sh
# or
./Dockerfile
```

# Python stuff

### To upgrade `pip`:

```bash
pip install --upgrade pip
```

### To install `pip-tools`:

```bash
pip install pip-tools
```

### To generate `requirements.txt`:

```bash
pip-compile # reads pyproject.toml
# or
pip-compile --extra dev # includes optional dev dependencies
```

### To install dependency:

```bash
pip install [package]
```

### To upgrade dependency:

```bash
pip-compile --upgrade # all dependencies
# or
pip-compile --upgrade-package [package]
```

### To uninstall dependency:

```bash
pip-autoremove [package] -y
```

### To review package versions:

```bash
pip-review
```

### To sync dependencies:

```bash
pip-sync
```

### To manually lint `api.py`:

```bash
./lint.sh
```
