---
title: Warehouses
description: "Skippr lands data in Snowflake, BigQuery, Postgres, Athena, Databricks, and other warehouses you already run—then generates dbt against those tables."
---

# Warehouses

Skippr ELT writes to the warehouse or object store you already use. Ingest, model, and query share the same `data_sinks` plugin YAML. Type mapping is per-sink — native types, not lowest-common-denominator strings.

## Destinations

| Warehouse | Connector |
|-----------|-----------|
| Snowflake | [Snowflake](/elt/connectors/destinations/snowflake) |
| BigQuery | [BigQuery](/elt/connectors/destinations/bigquery) |
| PostgreSQL | [PostgreSQL](/elt/connectors/destinations/postgres) |
| Amazon Athena | [Athena](/elt/connectors/destinations/athena) |
| Databricks | [Databricks](/elt/connectors/destinations/databricks) |
| Azure Synapse | [Synapse](/elt/connectors/destinations/synapse) |
| Amazon Redshift | [Redshift](/elt/connectors/destinations/redshift) |
| ClickHouse | [ClickHouse](/elt/connectors/destinations/clickhouse) |
| MotherDuck | [MotherDuck](/elt/connectors/destinations/motherduck) |
| GCS / Azure Blob / SFTP | [GCS](/elt/connectors/destinations/gcs), [Azure Blob](/elt/connectors/destinations/azure-blob), [SFTP](/elt/connectors/destinations/sftp) |

Hub pages for warehouse-specific ELT walkthroughs: [ELT warehouses](/elt/warehouses/).

## Related

- [Destinations overview](/elt/connectors/destinations/)
- [Quick start: Snowflake](/elt/getting-started/quickstart-snowflake)
- [Quick start: PostgreSQL](/elt/getting-started/quickstart-postgres)
- [Quick start: BigQuery](/elt/getting-started/quickstart-bigquery)
