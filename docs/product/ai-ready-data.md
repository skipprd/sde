---
title: AI-ready data
description: "Land typed, schema-consistent Parquet and warehouse tables with Skippr ELT—bronze you can query, plus dbt models for analytics, ML, and agent workloads."
---

# AI-ready data

Output is typed, schema-consistent Parquet and warehouse-native tables. Downstream ML, embeddings, and agent workloads consume the same tables you already query.

## What you get

- **Structured Parquet** — columnar, compressed, typed.
- **Schema consistency** — every record follows a validated schema.
- **Type reconciliation** — when a field’s type changes, Skippr adds a new column instead of mutating in place.
- **Natural-language to SQL** — [`sde ask`](/cli/ask) translates questions into SQL against your warehouse tables.

## Pipeline

1. **Ingest** — exactly-once delivery; unparseable records dead-lettered.
2. **Structure** — schema discovery and type mapping.
3. **Output** — Parquet / warehouse tables.
4. **Consume** — analytics, feature stores, RAG, and agents.

Row-level data stays on the path from the runner to your destination. See [ELT home](/elt/).

## Related

- [Data modeling](/product/data-modeling)
- [`sde vector`](/cli/vector)
