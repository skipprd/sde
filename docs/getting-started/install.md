---
title: "Skippr CLI"
description: "Install the Skippr CLI on macOS, Linux, or Windows (curl or PowerShell). The same binary calls Skippr Cloud and runs Production ELT into reviewable dbt."
---
# Skippr CLI

Install the CLI first. Then add Python and dbt so Skippr can generate and validate standard dbt output. The same binary also calls Skippr Cloud services after `skippr login`.

## Install skippr

By downloading or installing Skippr, you accept the [Skippr EULA](/terms/eula).

### macOS / Linux

```bash
curl -fsSL https://install.skippr.io/install.sh | sh
```

This detects your platform, downloads the latest release, and installs `skippr` to `/usr/local/bin`.

### Windows

Run the following in **PowerShell** (the default terminal in VS Code on Windows):

```powershell
irm https://install.skippr.io/install.ps1 | iex
```

This downloads the latest release, installs `skippr.exe` to `%LOCALAPPDATA%\skippr\bin`, and adds it to your user `PATH` — so you can run `skippr` from any terminal without needing `.\skippr.exe`.

To use `skippr` immediately in the current session, restart your terminal or open a new one.

::: tip cmd.exe users
From a standard Command Prompt you can invoke the same installer:
```cmd
powershell -c "irm https://install.skippr.io/install.ps1 | iex"
```
:::

### Manual install (any platform)

Download the binary for your platform from `https://install.skippr.io/releases/skippr/<tag>/` and place it on your `PATH`.

Verify the install:

```bash
skippr --version
```

The same binary also calls Skippr Cloud. After `skippr login --email you@example.com`, run Cloud commands such as `skippr tables list-tables`. See [CLI and SDKs](/cloud/cli). ELT account login stays `skippr user login`.

## Install OpenSSL (Windows only)

OpenSSL is required for Snowflake key-pair authentication. On macOS and Linux it is typically pre-installed.

```powershell
winget install OpenSSL
```

After installing, restart your terminal so the `openssl` command is available.

## Install Python and dbt

`skippr` uses dbt under the hood for model compilation and materialisation. The first-run path is:

1. install `skippr`
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

Verify with `dbt --version`. The virtual environment must be active whenever you run `skippr`.

## Authenticate

Log in or create a new Skippr account (same command for both):

```bash
skippr user login
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

Authentication enables cloud-backed control-plane services and provides a hosted LLM key by default. Row-level source data still moves directly from the machine running `skippr` to your destination.

## Next steps

You're ready to go. Head to the [Quick Start](quickstart.md) to choose the best first path:

- [Snowflake](quickstart-snowflake.md) for the most common production-style evaluation
- [PostgreSQL](quickstart-postgres.md) for a local evaluation path
- [BigQuery](quickstart-bigquery.md) for a GCP-first evaluation
