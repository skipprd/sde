---
description: "Quick start: load S3 files into BigQuery with Skippr. Six commands to bronze, then generate silver/gold dbt Skippr validates in your GCP project."
---
# Quick Start: BigQuery

Six commands to go from files in S3 to materialised dbt models in BigQuery -- bronze, silver, and gold layers, all generated and validated automatically.

## Prerequisites

- `skippr` on PATH ([Install](install.md))
- Python venv with `dbt-core` and `dbt-bigquery`
- Authenticated via `skippr user login` (or `SKIPPR_API_KEY` for CI)
- BigQuery and AWS credentials in your environment:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
export AWS_ACCESS_KEY_ID="AKIA..."
export AWS_SECRET_ACCESS_KEY="..."
```

Need help with credentials? See [BigQuery](../connectors/destinations/bigquery.md) and [S3](../connectors/sources/s3.md).

## Build the pipeline

```bash
# 1. Create the project
mkdir my-workspace && cd my-workspace
skippr init s3-analytics

# 2. Point at your warehouse
skippr connect warehouse bigquery \
  --project my-gcp-project \
  --dataset raw_data \
  --location US

# 3. Point at your source
skippr connect source s3 \
  --s3-bucket my-data-bucket \
  --s3-prefix raw/

# 4. Verify everything is wired up
skippr doctor

# 5. Load bronze data
skippr sync --pipeline s3-analytics --once

# 6. Generate and validate dbt models
skippr model --pipeline s3-analytics
```

That's it. `skippr sync --pipeline s3-analytics --once` discovers file schemas when needed and loads data into BigQuery; `skippr model --pipeline s3-analytics` then generates a complete dbt project with silver and gold models -- compiled and materialised.

## What you get

### dbt models (ready to extend)

```
models/
├── schema.yml                   # source definitions
└── staging/
    ├── stg_raw_events.sql       # silver model
    └── stg_raw_sessions.sql     # silver model
```

### BigQuery datasets (populated and queryable)

| Dataset | Contents |
|---|---|
| `raw_data` | Bronze -- raw extracted data |
| `s3_analytics_silver` | Silver -- staged and cleansed |
| `s3_analytics_gold` | Gold -- mart-ready models |

### Project config

```yaml
# skippr.yml
skippr:
  workspace: s3_analytics
pipelines:
  s3-analytics:
    data_source: data_sources.source
    data_sink: data_sinks.warehouse
data_sources:
  source:
    S3:
      s3_bucket: my-data-bucket
      s3_prefix: "raw/"
data_sinks:
  warehouse:
    BigQuery:
      project: my-gcp-project
      dataset: raw_data
      location: US
```

## What you have at the end

- The runner reads S3 data and writes it directly into BigQuery.
- Skippr generates a reviewable dbt project as standard dbt files you can inspect and extend.
- Authentication and control-plane services are cloud-backed, but row-level source data does not pass through that cloud path.
- For the full pipeline flow and CDC behavior, see [How It Works](how-it-works.md) and [CDC Guarantees](../cdc/guarantees.md).

## What's next

- Run `skippr sync --pipeline s3-analytics --once` again -- it is incremental, only new and changed rows are synced.
- Re-run `skippr model --pipeline s3-analytics` to resume the latest modeling thread. Use `skippr model --pipeline s3-analytics --no-resume` when you want a clean modeling attempt.
- The dbt project is yours. Add tests, snapshots, or custom gold models.
- See [How It Works](how-it-works.md) for the full pipeline breakdown.
