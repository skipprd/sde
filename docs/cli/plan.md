---
description: "Preview a data-engineering plan with skippr plan. Same hosted agent as model, but no warehouse writes—use it for review gates and CI."
---
# skippr plan

`skippr plan` produces a **data-engineering plan** for the configured pipeline **without** applying model changes. It uses the same hosted agent context as `skippr model`, but stops at planning-style output suitable for review or automation gates.

## Usage

```bash
skippr [--config <path>] [--log [level]] plan --pipeline <name> [--goal "<text>"] [--output text|json|jsonl]
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

Same as [`skippr ask`](/elt/cli/ask) and [`skippr model`](/elt/cli/model): valid `skippr.yml`, authentication, and prepaid funds for Cloud-backed LLM usage (billed as vCPU time, memory time, bytes stored, and network bytes).

## See also

- [`skippr ask`](/elt/cli/ask) — read-only Q&A.
- [`skippr model`](/elt/cli/model) — apply the full modeling workflow.
