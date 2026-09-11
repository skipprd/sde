---
title: ELT features
description: "Skippr ELT features: exactly-once delivery, schema evolution, dead letters, crash recovery, and connectors—extract, load, and model without a cluster."
---

# ELT features

Core capabilities in one Rust runner. No cluster and no separate orchestrator for the default path.

| Feature | What it does |
|---------|----------------|
| Exactly-once delivery | WAL-backed ingestion with per-record offsets. Survives SIGKILL, OOM, and I/O errors. |
| Schema evolution | New columns and type-change columns; existing data is not rewritten. |
| Dead letter handling | Unparseable records quarantined as queryable Parquet. Never silently dropped. |
| Crash recovery | Resume from the last committed offset. |
| Connector ecosystem | 25+ sources. See [Sources](/connectors/sources/). |
| Built-in SQL | Query tables and WAL via the runner SQL surface. See [CLI](/cli/init). |
| Single Rust binary | One process. No Python runtime for ingest; dbt is used for generated models. |
| Any warehouse | [Destinations](/connectors/destinations/). |
| Privacy | Row-level data stays on the runner-to-destination path. AI modeling uses schema metadata by default. |
| Pricing | Skippr Cloud meters: vCPU time, memory time, bytes stored, network bytes. No monthly seat or MAR pack. |
| Autonomous repair | Common dbt validation failures are adjusted and re-run; you still review the SQL. |

## Compared with building it yourself

| Dimension | Skippr ELT | Manual ETL | Hiring a data engineer |
|-----------|------------|------------|------------------------|
| Setup | Minutes with [install](/getting-started/install) | Days to weeks | Weeks of hiring plus onboarding |
| Schema handling | Automatic evolution | Migration scripts | Manual |
| Crash recovery | WAL-backed | Re-runs | Custom retry logic |
| Data path | Runner to your warehouse | Depends on tooling | You build it |
| Pricing | vCPU time, memory time, bytes stored, network bytes | Tooling licenses and cloud SKUs | Salary plus tools |

## Related

- [Core concepts](/advanced/core-concepts)
- [Exactly-once in CDC](/cdc/guarantees)
