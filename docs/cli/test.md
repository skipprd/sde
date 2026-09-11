---
description: "List and run dbt tests with sde test against the same generated project sde model publishes. Validate models in CI without re-running the agent."
---
# sde test

`sde test` lists and runs [dbt tests](https://docs.getdbt.com/docs/build/tests) against the same generated dbt project materialised from cloud storage as `sde model`. Use it after modeling to validate models in CI or locally without re-running the full data-engineer agent loop.

## Subcommands

| Subcommand | Purpose |
|---|---|
| `sde test list` | Print discovered dbt tests (from the manifest) as JSON or text. |
| `sde test run` | Run `dbt test` and stream structured results (`jsonl` by default). |

## Usage

**List tests**

```bash
sde [--config <path>] [--log [level]] test list --pipeline <name> [--output json|text]
```

**Run tests**

```bash
sde [--config <path>] [--log [level]] test run --pipeline <name> [--select <expr>]... [--output jsonl|json|text]
```

## Flags

### `test list`

| Flag | Description |
|---|---|
| `--pipeline <name>` | Pipeline whose dbt project to inspect. |
| `--output json` | Machine-readable list (default). |
| `--output text` | Human-readable summary. |

### `test run`

| Flag | Description |
|---|---|
| `--pipeline <name>` | Pipeline whose dbt project to test. |
| `--select <expr>` | dbt `--select` expression (repeatable). Limits which tests (and dependencies) run. |
| `--output jsonl` | One JSON object per line (`test_result` events and a final `run_complete`). Default for automation. |
| `--output json` | Aggregate JSON where supported. |
| `--output text` | Plain text. |

Global flags match other engine commands (`--config`, `--log`). Authentication and hosted storage behave like [`sde model`](/cli/model): use `sde user login`, stored credentials, or `SKIPPR_API_KEY` for CI.

## Prerequisites

- A pipeline with a valid `data_sink` in `skippr.yml` (same requirement as modeling), so the internal dbt layout can be resolved.
- dbt enabled in the resolved suite config (`providers.dbt.enabled` is true by default for translated configs).

## See also

- [`sde model`](/cli/model) — generate and validate the dbt project first.
- [`sde discover`](/cli/discover) / [`sde sync`](/cli/sync) — load bronze data before tests that depend on warehouse state.
