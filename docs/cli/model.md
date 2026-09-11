---
description: "Generate, validate, and publish dbt with sde model. Turns bronze warehouse tables into silver/gold models you can review, test, and own."
---
# sde model

Model runs the data-engineer workflow for dbt planning, authoring, validation, review, and publish steps.

## Usage

```bash
skippr [--config <path>] [--log [level]] model --pipeline <name> [--no-resume]
```

`model` compiles the pipeline's `data_sink` from `data_sinks` plus built-in defaults for catalog, dbt, vector, storage, and LLM settings. Extract and load are handled by `sde discover --pipeline <name>` and `sde sync --pipeline <name>`, not by the modeling workflow.

## Flags

Command flags:

| Flag | Description |
|---|---|
| `--pipeline <name>` | Required. Selects the configured pipeline to model; the destination comes from that pipeline's `data_sink`. |
| `--no-resume` | Start a fresh modeling thread instead of resuming the latest project thread. Use this when the previous model run is stale, failed before useful state was persisted, or you deliberately want a clean attempt. |

Global flags:

| Flag | Description |
|---|---|
| `--config <path>` | Read a config file other than `./skippr.yml`. |
| `--log info` | Structured logs to stdout |
| `--log debug` | Debug-level logs |
| `--log trace` | Maximum verbosity |

By default, `sde model --pipeline <name>` resumes the latest thread for that pipeline when one exists. That makes retries idempotent and lets a run continue from persisted modeling state. Add `--no-resume` only when you want to discard that thread selection and start a new model run.

## See also

- [`sde test`](/cli/test) — list and run dbt tests against the materialised project.
- [`sde plan`](/cli/plan) / [`sde ask`](/cli/ask) — planning and read-only Q&A without applying model changes.
