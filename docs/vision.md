---
description: "What is an AI data agent? Skippr extracts, loads, and models into warehouse tables and dbt you own—not a black-box runtime you cannot inspect or export."
---
# What Is an AI Data Agent?

Skippr is an AI Data Agent: a runner that helps teams extract, load, and model data into reviewable warehouse assets without hiding the output behind a proprietary runtime.

`Like Codex, but for data.` is the mental model. Codex reads a codebase, writes code, validates it, and gives you something to review. Skippr reads source metadata, syncs raw data, drafts dbt assets, validates them, and gives you warehouse tables plus a dbt project to inspect.

## Why this category exists

Most teams already have sources, a warehouse, and a backlog of data work. The bottleneck is the repetitive setup between them:

- connecting sources
- handling schemas and drift
- loading raw tables safely
- scaffolding dbt models and tests
- validating the result end to end

That is the `EL(T)M` wedge for Skippr. `AI Data Agent` is the category. `EL(T)M` is the concrete technical job it performs.

## What Skippr automates

1. **Extract**: connect databases, files, and streams and sync raw data into your destination.
2. **Load**: land bronze tables with incremental or CDC-aware behavior depending on the path.
3. **Model**: draft silver and gold dbt assets, then validate them against the destination.

Ingestion correctness does not depend on model output. Schema discovery, type mapping, incremental tracking, and CDC reconciliation are deterministic. AI is used where it speeds up reviewable modeling work.

## How Skippr stays reviewable

- **Reviewable output**: Skippr writes standard dbt files and warehouse assets you can inspect and extend.
- **Clear data boundary**: row-level source data stays on the machine running `sde` and in your destination.
- **Scoped AI input**: schema metadata is the default model input. Data samples are optional and off by default.
- **CDC semantics**: the CDC docs explain how order tokens, tombstones, and exactly-once final-state behavior work in supported paths.

## Where to go next

- [Install](/getting-started/install)
- [How It Works](/getting-started/how-it-works)
- [Core Concepts](/advanced/core-concepts)
- [CDC Guarantees](/cdc/guarantees)
