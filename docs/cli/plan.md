---
description: "Preview a data-engineering plan with sde plan. Same hosted agent as model, but no warehouse writes—use it for review gates and CI."
---
# sde plan

`sde plan` produces a **data-engineering plan** for the configured pipeline **without** applying model changes. It uses the same hosted agent context as `sde model`, but stops at planning-style output suitable for review or automation gates.

## Usage

```bash
sde [--config <path>] [--log [level]] plan --pipeline <name> [--goal "<text>"] [--output text|json|jsonl]
```

## Flags

| Flag | Description |
|---|---|
| `--pipeline <name>` | Pipeline to plan against. |
| `--goal <text>` | Optional high-level goal (defaults to a generic planning prompt if omitted). |
| `--output text` | Default human-readable plan. |
| `--output json` / `jsonl` | Structured output for CI. |

Global flags: `--config`, `--log`.

## Prerequisites

Same as [`sde ask`](/cli/ask) and [`sde model`](/cli/model): valid `skippr.yml`, authentication, and prepaid funds for Cloud-backed LLM usage (billed as vCPU time, memory time, bytes stored, and network bytes).

## See also

- [`sde ask`](/cli/ask) — read-only Q&A.
- [`sde model`](/cli/model) — apply the full modeling workflow.
