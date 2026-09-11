---
title: Schema discovery
description: "Skippr infers source schemas on discover and evolves them with backward-compatible column adds—no hand-written mapping for most Postgres or S3 tables."
---

# Schema discovery

Schema inference is deterministic: the same input produces the same schema. Nested JSON, CSV headers, Parquet metadata, and mixed types are handled without manual mapping.

## Evolution

When schemas change, Skippr diffs and applies backward-compatible updates. New columns are added. Type changes create a new column; existing data is not rewritten. Downstream queries keep working against the original column.

## Pipeline

1. **Sample** — read a configurable sample from the source.
2. **Infer** — build a complete schema, including nested records, arrays, and maps.
3. **Diff** — compare against the previous run.
4. **Apply** — additive evolution only.

See [How it works](/getting-started/how-it-works) and [Source landing semantics](/advanced/source-landing-semantics).

## Related

- [`sde discover`](/cli/discover)
- [Data cleansing](/product/data-cleansing)
