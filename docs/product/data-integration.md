---
title: Data integration
description: "Connect databases, files, APIs, and streams, then load your warehouse with exactly-once Skippr ELT. One runner for extract, load, and generated dbt."
---

# Data integration

`sde sync` is the extract/load path in Skippr ELT. It connects to data where it lives and delivers it to your warehouse with exactly-once guarantees before modeling.

## What you connect

Sources include MSSQL, MySQL, Postgres, MongoDB, Redshift, ClickHouse, MotherDuck, Delta Lake, S3, Kafka, SQS, AMQP, MQTT, HTTP APIs, and more. Configuration is a `skippr.yml` (or environment variables), not application code. Full list: [Sources](/connectors/sources/).

Skippr connects directly to sources or reads from object storage. You do not install daemons on databases or app servers.

## Delivery

WAL-backed ingestion tracks offsets per record. The runner resumes after crashes, SIGKILL, OOM, and I/O errors. Batch files and streaming sources use the same runner.

## Pipeline

1. **Connect** — point Skippr at the source.
2. **Discover** — sample and infer schema ([schema discovery](/product/schema-discovery)).
3. **Ingest** — WAL-backed offsets; compact to Parquet.
4. **Deliver** — structured tables in your warehouse ([destinations](/connectors/destinations/)).

## Related

- [CDC](/product/cdc) for change streams
- [`sde sync`](/cli/sync)
- [Install](/getting-started/install)
