---
description: "Chunk, embed, and upsert docs into a tenant vector store with sde vector ingest-docs. Separate from sde model; used for retrieval over your files."
---
# sde vector

The `sde vector` command group handles **vector store** workflows that do **not** go through `sde model`. Today the only subcommand is **`ingest-docs`**: walk declarative file sets from `skippr.yml`, chunk text, call the hosted embed API, and upsert vectors into **tenant** Lance storage on S3 (same keyspace layout as the data-engineer suite).

Public read copies of those vectors (for example marketing-site knowledge) are a **separate** sync step from your tenant prefix to the public vectors bucket; that is typically done in CI with a dedicated publish role, not by this CLI command alone.

## Subcommands

| Subcommand | Purpose |
|---|---|
| `sde vector ingest-docs` | Chunk, embed, and upsert documentation (or similar text files) into Lance under your tenant bucket. |

## Usage

```bash
skippr [--config <path>] [--log [level]] vector ingest-docs \
  [--pipeline <name>] \
  [--vector-source <key>] \
  [--src-path <dir>] \
  [--chunk-chars <n>] \
  [--chunk-overlap <n>] \
  [--include-glob <pattern>]... \
  [--exclude-glob <pattern>]... \
  [--dry-run] \
  [--output text|json]
```

## Configuration (`skippr.yml`)

Discovery rules live entirely in YAML — the binary does not hard-code paths or extensions.

- **`vector_sources`** — map of named sources. Each entry includes at least **`root`** (directory relative to the config file) and **`include`** (non-empty list of globs relative to `root`). Optional: **`exclude`**, **`extensions`**, per-source **`chunk_chars`** / **`chunk_overlap`**.
- **`pipelines.<name>`** — for `ingest-docs`, use a mapping with required **`vector_source`** (a key under **`vector_sources`**) and optional **`chunk_chars`** / **`chunk_overlap`**. The default pipeline name is **`vector_ingest`** (override with **`--pipeline`**).
- **`project`** (top-level) — becomes the React `project_id` in the Lance URI.
- **`skippr.workspace`** — workspace segment in the Lance path (same convention as the engine config).

There is **no** `data_sink` or warehouse requirement on this path; you still need Skippr authentication and a positive balance for embeddings.

## Flags

| Flag | Description |
|---|---|
| `--pipeline <name>` | Which `pipelines.<name>` block supplies `vector_source` (default: `vector_ingest`). |
| `--vector-source <key>` | Override `pipelines.<name>.vector_source` for this run (must match a `vector_sources` key). |
| `--src-path <dir>` | Override the scan root for this run (default: `root` from the selected source). |
| `--chunk-chars <n>` | Override chunk size (characters). Precedence: CLI → pipeline YAML → `vector_sources` entry → built-in default. |
| `--chunk-overlap <n>` | Override overlap between chunks. |
| `--include-glob <pattern>` | Extra include glob (repeatable); merged **after** YAML includes. |
| `--exclude-glob <pattern>` | Extra exclude glob (repeatable); merged **after** YAML excludes. |
| `--dry-run` | Resolve files and count chunks only; no embed or Lance writes. |
| `--output json` | Structured summary (dry run or post-ingest metadata including resolved Lance prefix). |
| `--output text` | Human-readable progress. |

Global flags: `--config`, `--log` (same as other commands).

## Authentication

Same as [`sde model`](/cli/model): `sde user login`, `SKIPPR_API_KEY` in CI, and `/auth/credentials` for tenant S3 + LLM. Optional API fields **`knowledge_credentials`** and **`public_vectors_bucket`** apply to **reading** published public vectors in apps, not to `ingest-docs` writes (ingest uses the primary tenant credentials).

## GitHub Actions

This repository ships **`.github/workflows/docs-vector-ingest.yml`**, which:

1. Checks out the repo.
2. Installs the CLI with the same public one-liner as [Install](/getting-started/install): `curl -fsSL https://install.skippr.io/install.sh | sh`.
3. Runs **`bash scripts/vector-ingest-docs.sh`** (which invokes `sde vector ingest-docs` against `./skippr.yml`).

Add a repository secret **`SKIPPR_API_KEY`** for an account that has already accepted the current EULA (interactive `sde user login` once if needed). The workflow runs on **`workflow_dispatch`** and on pushes to **`main`** / **`master`** that touch `docs/`, `skippr.yml`, or the ingest script.

## See also

- [Config file](/configuration/config-file) — `vector_sources` and doc-vector settings under `pipelines`.
- [`sde model`](/cli/model) — warehouse-backed modeling (separate from doc vector ingest).
