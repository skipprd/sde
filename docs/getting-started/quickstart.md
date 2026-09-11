---
description: "Get a Skippr pipeline running in minutes: init, connect warehouse and source, doctor, sync bronze, then model dbt. Snowflake, Postgres, or BigQuery."
---
# Quick Start

Get a working pipeline with materialised dbt models in under 5 minutes. Every guide follows the same pattern: `skippr init` a project, `skippr connect` your warehouse and source, run `skippr doctor` to check everything, then `skippr sync --pipeline <name> --once` to load bronze data and `skippr model` to generate and validate dbt assets.

If you need to reset one pipeline's Skippr state during testing, use:

```bash
skippr reset --pipeline <name>
```

That clears Skippr-owned runtime and modeling state for the selected pipeline while preserving your `skippr.yml`, source data, warehouse data, and schema sink resources.

## Quick start guides

| Warehouse | Source in example | Best for | Guide |
|---|---|---|---|
| Snowflake | MSSQL | Production-style evaluation and the most common starting point | [Quick Start: Snowflake](quickstart-snowflake.md) |
| PostgreSQL | S3 | Local evaluation without a cloud warehouse account | [Quick Start: PostgreSQL](quickstart-postgres.md) |
| BigQuery | S3 | GCP-first evaluation | [Quick Start: BigQuery](quickstart-bigquery.md) |

**Snowflake is the recommended starting point** -- it's the most common production deployment. If you're evaluating locally, the PostgreSQL guide is a great option with no cloud account required.

## All supported warehouses

Skippr supports nine warehouse destinations. The CLI workflow is identical for every one -- only the `skippr connect warehouse` command changes.

| Warehouse | Connector docs |
|---|---|
| Snowflake | [Setup guide](../connectors/destinations/snowflake.md) |
| BigQuery | [Setup guide](../connectors/destinations/bigquery.md) |
| PostgreSQL | [Setup guide](../connectors/destinations/postgres.md) |
| Redshift | [Setup guide](../connectors/destinations/redshift.md) |
| ClickHouse | [Setup guide](../connectors/destinations/clickhouse.md) |
| MotherDuck | [Setup guide](../connectors/destinations/motherduck.md) |
| Athena | [Setup guide](../connectors/destinations/athena.md) |
| Databricks | [Setup guide](../connectors/destinations/databricks.md) |
| Synapse | [Setup guide](../connectors/destinations/synapse.md) |

Each connector guide covers authentication, permissions or network requirements, and troubleshooting. See the full [Destinations overview](../connectors/destinations/) for cloud storage and messaging destinations.

## What every quickstart covers

- The runner reads source data and writes it directly to the destination.
- Skippr generates reviewable dbt output as standard dbt files you can inspect and extend.
- Authentication and control-plane services are cloud-backed, but row-level source data does not pass through that cloud path.

## Not sure which to pick?

Start with whichever warehouse you already have access to. If you're just exploring, PostgreSQL is the easiest to run locally. You can always add more warehouses later -- Skippr projects support multiple destinations.
