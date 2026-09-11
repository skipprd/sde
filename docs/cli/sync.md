---
description: "Extract and load. sde sync invokes skipprd on PATH."
---
# sde sync

Extract and load bronze data for a pipeline. This command shells out to `skipprd sync`. Put `skipprd` on PATH (see [elt.skippr.io](https://elt.skippr.io)).

## Usage

```bash
sde sync --pipeline <name> --once
```

Long-running CDC:

```bash
sde sync --pipeline <name>
```

Engine equivalent:

```bash
skipprd sync --pipeline <name> --once
```
