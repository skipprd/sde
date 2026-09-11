---
description: "Quick start: extract SQL Server into Snowflake with Skippr. Six commands to bronze, then generate silver/gold dbt you can inspect and run in Snowflake."
---
# Quick Start: Snowflake

## Install

<InstallTabs :show-heading="false" />

Six commands to go from a SQL Server database to materialised dbt models in Snowflake -- bronze, silver, and gold layers, all generated and validated automatically.

## Prerequisites

- `skippr` on PATH ([Install](install.md) — includes Windows PowerShell one-liner)
- Python venv with `dbt-core` and `dbt-snowflake`
- OpenSSL installed for key-pair auth (pre-installed on macOS/Linux; Windows: `winget install OpenSSL`)
- Authenticated via `skippr user login` (or `SKIPPR_API_KEY` for CI)
- Snowflake and MSSQL credentials in your environment:

```bash
export SNOWFLAKE_ACCOUNT="MYORG-MYACCOUNT"
export SNOWFLAKE_USER="myuser"
export SNOWFLAKE_PRIVATE_KEY_PATH="/path/to/snowflake_key.p8"
export MSSQL_CONNECTION_STRING="server=tcp:127.0.0.1,1433;database=testdb;user id=sa;password=YourPass;TrustServerCertificate=true"
```

Need help with credentials? See the [Snowflake connector guide](../connectors/destinations/snowflake.md) for auth setup (including [service accounts](../connectors/destinations/snowflake.md#service-account-authentication) and optional cross-cloud external staging on S3, Azure Blob, or GCS) and [MSSQL](../connectors/sources/mssql.md) for connection strings.

## Build the pipeline

```bash
# 1. Create the project
mkdir my-workspace && cd my-workspace
skippr init mssql-migration

# 2. Point at your warehouse
skippr connect warehouse snowflake \
  --database ANALYTICS \
  --schema RAW \
  --warehouse COMPUTE_WH \
  --role ACCOUNTADMIN

# 3. Point at your source
skippr connect source mssql \
  --connection-string '${MSSQL_CONNECTION_STRING}'

# 4. Verify everything is wired up
skippr doctor

# 5. Load bronze data
skippr sync --pipeline mssql-migration --once

# 6. Generate and validate dbt models
skippr model --pipeline mssql-migration
```

That's it. `skippr sync --pipeline mssql-migration --once` discovers schemas when needed and loads data into Snowflake; `skippr model --pipeline mssql-migration` then generates a complete dbt project with silver and gold models -- compiled and materialised.

## What you get

### dbt models (ready to extend)

```
models/
├── schema.yml                   # source definitions
└── staging/
    ├── stg_raw_customers.sql    # silver model
    └── stg_raw_orders.sql       # silver model
```

### Snowflake schemas (populated and queryable)

| Schema | Contents |
|---|---|
| `ANALYTICS.RAW` | Bronze -- raw extracted data |
| `ANALYTICS.MSSQL_MIGRATION_SILVER` | Silver -- staged and cleansed |
| `ANALYTICS.MSSQL_MIGRATION_GOLD` | Gold -- mart-ready models |

### Project config

```yaml
# skippr.yml
skippr:
  workspace: mssql_migration
pipelines:
  mssql-migration:
    data_source: data_sources.source
    data_sink: data_sinks.warehouse
data_sources:
  source:
    Mssql:
      connection_string: "${MSSQL_CONNECTION_STRING}"
data_sinks:
  warehouse:
    Snowflake:
      account: "${SNOWFLAKE_ACCOUNT}"
      user: "${SNOWFLAKE_USER}"
      database: ANALYTICS
      schema: RAW
      warehouse: COMPUTE_WH
      role: ACCOUNTADMIN
      private_key_path: "${SNOWFLAKE_PRIVATE_KEY_PATH}"
```

## What you have at the end

- The runner reads MSSQL data and writes it directly into Snowflake.
- Skippr generates a reviewable dbt project as standard dbt files you can inspect and extend.
- Authentication and control-plane services are cloud-backed, but row-level source data does not pass through that cloud path.
- For the full pipeline flow and CDC behavior, see [How It Works](how-it-works.md) and [CDC Guarantees](../cdc/guarantees.md).

## What's next

- Run `skippr sync --pipeline mssql-migration --once` again -- it is incremental, only new and changed rows are synced.
- Re-run `skippr model --pipeline mssql-migration` to resume the latest modeling thread. Use `skippr model --pipeline mssql-migration --no-resume` when you want a clean modeling attempt.
- The dbt project is yours. Add tests, snapshots, or custom gold models.
- See [How It Works](how-it-works.md) for the full pipeline breakdown.

## Install

<InstallTabs :show-heading="false" />
