---
title: ELT product
description: "Skippr Cloud ELT: discover a source, sync bronze into your warehouse, and generate silver/gold dbt you inspect and own. Install the runner and connect."
---

# ELT product

Skippr Cloud ELT is the extract, load, and model product on Skippr Cloud — a sibling of [tables](/cloud/tables), [gateway](/cloud/gateway), and [functions](/cloud/functions). The runner discovers sources, syncs bronze data into your warehouse, and produces silver/gold dbt you can inspect and own.

**Status:** Production. Start with [Install](/getting-started/install).

## What it does

| Capability | What you get | Next |
|------------|--------------|------|
| [Data integration](/product/data-integration) | Connect databases, files, and APIs; ingest with exactly-once delivery | [Sources](/connectors/sources/) |
| [CDC](/product/cdc) | Capture inserts, updates, and deletes with order-token guards | [CDC overview](/cdc/overview) |
| [Schema discovery](/product/schema-discovery) | Deterministic inference and backward-compatible evolution | [How it works](/getting-started/how-it-works) |
| [Data cleansing](/product/data-cleansing) | Schema evolution for drift; dead letters only for unparseable records | [Operations](/elt/operations/troubleshooting) |
| [Data modeling](/product/data-modeling) | Dimensions, facts, and metrics as validated dbt | [`sde model`](/cli/model) |
| [AI-ready data](/product/ai-ready-data) | Typed Parquet and warehouse tables for downstream ML | [Vision](/elt/vision) |
| [Warehouses](/product/warehouses) | Land in the warehouse you already use | [Destinations](/connectors/destinations/) |
| [Features](/product/features) | Exactly-once, crash recovery, privacy, single binary | [Core concepts](/advanced/core-concepts) |

## How a first pipeline runs

1. **Install** the runner — [Install](/getting-started/install).
2. **Discover** source metadata — [`sde discover`](/cli/discover).
3. **Sync** bronze data — [`sde sync`](/cli/sync).
4. **Model** reviewable dbt — [`sde model`](/cli/model).

Row-level source data moves from the machine running `sde` to your destination. Authentication and control-plane services are Cloud-backed. Cloud-backed usage bills as **vCPU time**, **memory time**, **bytes stored**, and **network bytes** — the same four meters as other Cloud capabilities. There is no monthly seat, MAR pack, or named usage-threshold SKU. See [How it works](/getting-started/how-it-works) and [ELT features](/product/features).

## Related

- [ELT home](/elt/)
- [Cloud ELT APIs](/cloud/elt) (managed pipeline APIs; Preview stub, not the runner)
- [Compare ELT](/compare/elt/)
