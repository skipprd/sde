---
description: "Discover source schemas. sde discover invokes skipprd on PATH."
---
# sde discover

Discover source schemas for a pipeline. This command shells out to `skipprd discover`. Put `skipprd` on PATH (see [elt.skippr.io](https://elt.skippr.io)).

## Usage

```bash
sde discover --pipeline <name>
```

Engine equivalent:

```bash
skipprd discover --pipeline <name>
```
