---
title: Warehouses
description: "Skippr lands data in Snowflake, BigQuery, Postgres, Athena, Databricks, and other warehouses you already run—then generates dbt against those tables."
---

# Warehouses

Skippr ELT writes to the warehouse or object store you already use. Ingest, model, and query share the same `data_sinks` plugin YAML. Type mapping is per-sink — native types, not lowest-common-denominator strings.

## Destinations

| Warehouse | Connector |
|-----------|-----------|
| Snowflake | [Snowflake](/connectors/destinations/snowflake) |
| BigQuery | [BigQuery](/connectors/destinations/bigquery) |
| PostgreSQL | [PostgreSQL](/connectors/destinations/postgres) |
| Amazon Athena | [Athena](/connectors/destinations/athena) |
| Databricks | [Databricks](/connectors/destinations/databricks) |
| Azure Synapse | [Synapse](/connectors/destinations/synapse) |
| Amazon Redshift | [Redshift](/connectors/destinations/redshift) |
| ClickHouse | [ClickHouse](/connectors/destinations/clickhouse) |
| MotherDuck | [MotherDuck](/connectors/destinations/motherduck) |
| GCS / Azure Blob / SFTP | [GCS](/connectors/destinations/gcs), [Azure Blob](/connectors/destinations/azure-blob), [SFTP](/connectors/destinations/sftp) |

Hub pages for warehouse-specific ELT walkthroughs: [ELT warehouses](/elt/warehouses/).

## Related

- [Destinations overview](/connectors/destinations/)
- [Quick start: Snowflake](/getting-started/quickstart-snowflake)
- [Quick start: PostgreSQL](/getting-started/quickstart-postgres)
- [Quick start: BigQuery](/getting-started/quickstart-bigquery)
