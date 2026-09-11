---
title: ELT for engineers
description: "Skippr for data engineers: one Rust binary, WAL-backed exactly-once delivery, deterministic schema discovery, and dbt you can diff, test, and ship."
---

# ELT for engineers

Skippr Cloud ELT is a compiled runner: WAL-backed exactly-once delivery, deterministic schema discovery, Apache Arrow in memory. Ingest does not require Python, a JVM, or a cluster. Modeling uses generated dbt (Python + adapter on the machine that runs `sde model`).

## Under the hood

### Rust — single binary

Skippr compiles to a statically linked binary. Memory safety is compile-time. Deploy with `scp`, a container, or cron. Host dependencies for ingest are compiled in.

### WAL-backed exactly-once

Every record is written to a write-ahead log before processing. Offsets are per-record. If the process is killed between WAL write and warehouse commit, recovery replays from the last committed offset.

### Apache Arrow

Records move as Arrow RecordBatches — columnar, cache-friendly. Type checks and null counts do not require per-row objects.

### Deterministic schema discovery

Inference is algorithmic, not generative. Nested types recurse. Type changes add a new column; existing data is never mutated.

### Per-sink types

TIMESTAMP becomes TIMESTAMP_NTZ in Snowflake, TIMESTAMP in BigQuery, timestamptz in Postgres. DDL uses additive `ALTER TABLE` and is safe to re-run.

### Dead letters

Only unparseable records are quarantined (truncated JSON, binary garbage). Dead letters are queryable Parquet with the original payload, error, run ID, and timestamp.

## What you are not building

| Component | DIY | Skippr ELT |
|-----------|-----|------------|
| Ingestion | Kafka / custom scripts | Built-in |
| Schema management | Manual DDL | Automatic evolution |
| Type mapping | Per-source, per-sink code | Deterministic, per-sink |
| Crash recovery | Custom checkpoints | WAL-backed |
| Data quality | Separate test suite | Dead letters |
| dbt bootstrapping | Hand-written SQL | [`sde model`](/cli/model) |
| Orchestration | Airflow / Dagster | Single process for the default path |
| Infrastructure | Kubernetes | One binary |

## Related

- [ELT product](/product/)
- [Vision](/elt/vision)
- [Install](/getting-started/install)
