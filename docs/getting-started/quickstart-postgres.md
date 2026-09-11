---
description: "Quick start: load S3 files into PostgreSQL with Skippr—no cloud warehouse account. Six commands to bronze, then generate and validate dbt locally."
---
# Quick Start: PostgreSQL

Six commands to go from files in S3 to materialised dbt models in PostgreSQL -- bronze, silver, and gold layers, all generated and validated automatically. No cloud warehouse account required.

## Prerequisites

- `skippr` on PATH ([Install](install.md))
- Python venv with `dbt-core` and `dbt-postgres`
- Authenticated via `skippr user login` (or `SKIPPR_API_KEY` for CI)
- PostgreSQL running locally or remotely
- PostgreSQL and AWS credentials in your environment:

```bash
export POSTGRES_HOST="localhost"
export POSTGRES_USER="myuser"
export POSTGRES_PASSWORD="mypassword"
export AWS_ACCESS_KEY_ID="AKIA..."
export AWS_SECRET_ACCESS_KEY="..."
```

Need help with credentials? See [PostgreSQL](../connectors/destinations/postgres.md) and [S3](../connectors/sources/s3.md).

## Build the pipeline

```bash
# 1. Create the project
mkdir my-workspace && cd my-workspace
skippr init s3-pipeline

# 2. Point at your warehouse
skippr connect warehouse postgres \
  --database analytics \
  --schema raw

# 3. Point at your source
skippr connect source s3 \
  --s3-bucket my-data-bucket \
  --s3-prefix raw/

# 4. Verify everything is wired up
skippr doctor

# 5. Load bronze data
skippr sync --pipeline s3-pipeline --once

# 6. Generate and validate dbt models
skippr model --pipeline s3-pipeline
```

That's it. `skippr sync --pipeline s3-pipeline --once` discovers file schemas when needed and loads data into PostgreSQL; `skippr model --pipeline s3-pipeline` then generates a complete dbt project with silver and gold models -- compiled and materialised.

## What you get

### dbt models (ready to extend)

```
models/
├── schema.yml                   # source definitions
└── staging/
    ├── stg_raw_events.sql       # silver model
    └── stg_raw_sessions.sql     # silver model
```

### PostgreSQL schemas (populated and queryable)

| Schema | Contents |
|---|---|
| `raw` | Bronze -- raw extracted data |
| `s3_pipeline_silver` | Silver -- staged and cleansed |
| `s3_pipeline_gold` | Gold -- mart-ready models |

### Project config

```yaml
# skippr.yml
skippr:
  workspace: s3_pipeline
pipelines:
  s3-pipeline:
    data_source: data_sources.source
    data_sink: data_sinks.warehouse
data_sources:
  source:
    S3:
      s3_bucket: my-data-bucket
      s3_prefix: "raw/"
data_sinks:
  warehouse:
    Postgres:
      host: localhost
      port: 5432
      user: ${POSTGRES_USER}
      password: ${POSTGRES_PASSWORD}
      database: analytics
      schema: raw
```

## What you have at the end

- You can evaluate Skippr without a cloud warehouse account.
- The runner reads S3 data and writes it directly into PostgreSQL.
- Skippr generates a reviewable dbt project as standard dbt files you can inspect and extend.
- For the full pipeline flow and architecture, see [How It Works](how-it-works.md) and [Core Concepts](../advanced/core-concepts.md).

## What's next

- Run `skippr sync --pipeline s3-pipeline --once` again -- it is incremental, only new and changed rows are synced.
- Re-run `skippr model --pipeline s3-pipeline` to resume the latest modeling thread. Use `skippr model --pipeline s3-pipeline --no-resume` when you want a clean modeling attempt.
- The dbt project is yours. Add tests, snapshots, or custom gold models.
- See [How It Works](how-it-works.md) for the full pipeline breakdown.
- Ready for production? Swap to [Snowflake](quickstart-snowflake.md) or any of the [supported warehouses](quickstart.md#all-supported-warehouses) with a single command.
