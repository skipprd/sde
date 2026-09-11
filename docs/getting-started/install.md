---
title: "Install sde"
description: "Install Skippr Data Engineer (sde) and skipprd. sde is not the Cloud skippr CLI."
---

# Install sde

Skippr Data Engineer is the **`sde`** binary. It is not Cloud `skippr`. Discover and sync invoke **`skipprd`** on PATH.

## Install sde and skipprd

By downloading or installing Skippr Data Engineer, you accept the [Skippr EULA](https://skippr.io/terms/eula).

### Homebrew

```bash
brew tap skipprd/tap
brew install sde skipprd
```

### GitHub Releases

Download linux x86_64 / darwin arm64 tarballs from [sde releases](https://github.com/skipprd/sde/releases) and [skipprd releases](https://github.com/skipprd/skipprd/releases). Place both binaries on PATH.

Verify:

```bash
sde --version
skipprd --version
```

Cloud `skippr` is a different product. Install that from [skippr.io](https://skippr.io/cloud/cli/) if you need Cloud APIs.

## Install OpenSSL (Windows only)

OpenSSL is required for Snowflake key-pair authentication. On macOS and Linux it is typically pre-installed.

```powershell
winget install OpenSSL
```

After installing, restart your terminal so the `openssl` command is available.

## Install Python and dbt

`sde model` uses dbt for compilation and materialisation. The first-run path is:

1. install `sde` and `skipprd`
2. create a Python virtual environment
3. install `dbt-core` plus your warehouse adapter
4. authenticate
5. run a quickstart

Set up a virtual environment and install dbt with the adapter for your warehouse:

::: code-group

```bash [macOS / Linux]
python3 -m venv .venv
source .venv/bin/activate

pip install --upgrade pip
pip install dbt-core
```

```powershell [Windows (PowerShell)]
python -m venv .venv
.\.venv\Scripts\Activate.ps1

pip install --upgrade pip
pip install dbt-core
```

```cmd [Windows (cmd)]
python -m venv .venv
.\.venv\Scripts\activate.bat

pip install --upgrade pip
pip install dbt-core
```

:::

Then install the adapter for your warehouse:

| Warehouse | Adapter |
|---|---|
| Snowflake | `pip install dbt-snowflake` |
| BigQuery | `pip install dbt-bigquery` |
| Postgres | `pip install dbt-postgres` |
| Athena | `pip install dbt-athena-community` |
| Databricks | `pip install dbt-databricks` |
| Synapse | `pip install dbt-synapse` |
| Redshift | `pip install dbt-redshift` |
| ClickHouse | `pip install dbt-clickhouse` |
| MotherDuck | `pip install dbt-duckdb` |

Verify with `dbt --version`. The virtual environment must be active whenever you run `sde model`.

## Authenticate

```bash
sde user login
```

For CI/CD, set an API key instead:

::: code-group

```bash [macOS / Linux]
export SKIPPR_API_KEY="sk_live_..."
```

```powershell [Windows (PowerShell)]
$env:SKIPPR_API_KEY = "sk_live_..."
```

```cmd [Windows (cmd)]
set SKIPPR_API_KEY=sk_live_...
```

:::

See [Authentication](authentication.md) for API key management and details.

Authentication enables cloud-backed control-plane services and provides a hosted LLM key by default. Row-level source data still moves directly from the machine running `sde` to your destination.

## Next steps

You're ready to go. Head to the [Quick Start](quickstart.md) to choose the best first path:

- [Snowflake](quickstart-snowflake.md) for the most common production-style evaluation
- [PostgreSQL](quickstart-postgres.md) for a local evaluation path
- [BigQuery](quickstart-bigquery.md) for a GCP-first evaluation
