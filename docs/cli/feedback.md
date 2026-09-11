---
description: "Flag the latest Skippr run as good or bad with skippr feedback. Sends comments to support without exposing source rows or warehouse data."
---
# skippr feedback

Attach your feedback to the most recent run for the current project. This is useful after a run completes, stalls, or produces output you want to flag for review and debugging by a Skippr engineer.

The feedback only includes run metadata and your feedback. The Skippr support platform and engineers cannot see your data.

## Usage

```bash
skippr feedback --good
skippr feedback --bad
skippr feedback --bad --comment "timed out in repair loop"
```

The command always targets the most recent primary thread in the active run storage backend for the current project.

## Flags

| Flag | Description |
|---|---|
| `--good` | Mark the most recent thread run as good |
| `--bad` | Mark the most recent thread run as bad |
| `--comment "..."` | Provide feedback non-interactively for scripts, CI, or automation |
| `--no-diagnostics` | Do not attach the redacted support diagnostics bundle |

Exactly one of `--good` or `--bad` is required.

## Interactive mode

If `--comment` is omitted, Skippr prompts for a single-line message:

```text
Leave feedback:
```

## Examples

Leave positive feedback after a successful run:

```bash
skippr feedback --good --comment "all the data is synced and the auto-generated models are already providing valuable insight"
```

Flag a bad run with a comment:

```bash
skippr feedback --bad --comment "synced data, schemas look great, but stalled in review and never finished"
```
