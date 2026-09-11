---
description: "Ask a read-only data-engineering question about a Skippr pipeline. skippr ask uses the hosted agent on your catalog and warehouse without changing models."
---
# skippr ask

`skippr ask` runs a **read-only** data-engineering question against the configured pipeline: it uses the same authenticated, hosted runtime as `skippr model`, but does not apply patches or change warehouse state beyond what a normal read-only SQL path would do.

## Usage

```bash
skippr [--config <path>] [--log [level]] ask --pipeline <name> --question "<text>" [--output text|json|jsonl]
```

## Flags

| Flag | Description |
|---|---|
| `--pipeline <name>` | Pipeline to scope catalog and warehouse context. |
| `--question <text>` | Natural-language question for the agent. |
| `--output text` | Default terminal-oriented output. |
| `--output json` / `jsonl` | Structured events for tooling. |

Global flags: `--config`, `--log`.

## Prerequisites

Same authentication and Cloud metering as [`skippr model`](/elt/cli/model): hosted LLM usage bills as **vCPU time**, **memory time**, **bytes stored**, and **network bytes**. The pipeline must be fully configured in `skippr.yml` (source, sink, etc.) so the data-engineer suite can resolve providers.

## See also

- [`skippr plan`](/elt/cli/plan) — produce a plan without applying changes.
- [`skippr model`](/elt/cli/model) — full modeling workflow with writes.
