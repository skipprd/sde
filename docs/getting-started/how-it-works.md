---
description: "How Skippr ELT works: discover source schemas, skippr sync bronze into your warehouse, then skippr model to draft, validate, and publish dbt."
---
# How It Works

The CLI moves through a short public pipeline model: discover the source, sync raw data, draft dbt assets, and validate the result. `skippr sync` handles extract/load; `skippr model` runs the data-engineer workflow that plans, authors, validates, and reviews the dbt project.

## The pipeline

```
Your Source
  │
  │  discover ── inspect metadata and shape the destination
  ▼
Discover
  │
  │  sync ── move raw rows into bronze tables
  ▼
Bronze Tables
  │
  │  model ── draft silver/gold dbt assets
  ▼
Reviewable dbt Project
  │
  │  validate ── compile and run against the destination
  ▼
Silver and Gold Models
```

`sync` automatically runs discovery when metadata is missing. Modeling is a separate command so you can load bronze data on a schedule and run dbt authoring when you are ready. You see real-time progress in the terminal UI, or structured logs with `--log`.

## How this maps to the CLI phases

| Public step | What runs |
|---|---|
| **Discover** | `skippr discover` (internal `Discover`) |
| **Sync** | `skippr sync` (internal `Sync`, `Verify`) |
| **Model** | `skippr model` (internal phases such as `Plan`, `Author`, **`Validate`**, **`Review`** — these are part of the model run, not a separate CLI) |
| **dbt tests** | [`skippr test`](/elt/cli/test) only — e.g. `skippr test list`, `skippr test run`. **Not** `skippr validate` (that command does not exist). |

## What happens at each step

1. **Discover** -- reads source metadata such as table names, column names, and types. Destination mapping is determined here, using deterministic logic rather than model output.
2. **Sync** -- extracts rows and files from the source and writes them into bronze tables in your destination. API sources can declare [how each table lands](/elt/advanced/source-landing-semantics) (for example replace-by-date for mutable reports).
3. **Model** -- drafts a dbt project with source definitions, staging models, and business-facing models for review.
4. **Checks and tests** -- While `skippr model` runs, the workflow already compiles and validates models against the destination (those are **internal** steps, not a `skippr validate` command). When you want **dbt tests** as a separate step — for example in CI after a model run — use [`skippr test run`](/elt/cli/test) (see [`skippr test`](/elt/cli/test)).

## Incremental by default

Re-running `skippr sync` on an existing project doesn't start from scratch:

- **Data sync** -- offsets are tracked internally. Only new and changed rows are extracted and loaded.
- **dbt models** -- existing models are preserved. The agent updates or adds new models as the source evolves.

This means you can run the same pipeline on a schedule and it behaves like a proper incremental ETL -- no custom state management required.

## Resumable modeling

By default, `skippr model --pipeline <name>` resumes the latest modeling thread for the current pipeline when one exists. Use `skippr model --pipeline <name> --no-resume` to start a fresh thread, for example after changing the source shape significantly or when you want to ignore stale run state.

## Data privacy

Row-level data only ever exists in two places: the machine running `skippr`, and your warehouse.

- **Source data** is read locally and written directly to the warehouse API (Snowflake REST, BigQuery API, Postgres wire protocol, etc.). It is never sent to Skippr or any third party.
- **AI modeling** uses only metadata (table names, column names, types) by default. Data samples can optionally be sent to improve model quality but are off by default.
- **The Skippr cloud path** handles authentication and control-plane services. It receives metadata needed to operate the service, not row-level source or warehouse data. Cloud-backed usage bills as **vCPU time**, **memory time**, **bytes stored**, and **network bytes**.
- **Credentials** live in environment variables, never in config files.

## Output structure

The pipeline creates schemas in your warehouse using the project name:

| Tier | Schema name | Contents |
|---|---|---|
| Bronze | `<warehouse_schema>` (e.g. `RAW`) | Raw extracted data |
| Silver | `<project>_silver` (e.g. `my_project_silver`) | Staged, cleaned, typed |
| Gold | `<project>_gold` (e.g. `my_project_gold`) | Business-ready models |

## What you can inspect

- Bronze, silver, and gold objects in your destination
- The generated dbt project in your working directory
- Connector guides for auth, permissions or network requirements, and troubleshooting
