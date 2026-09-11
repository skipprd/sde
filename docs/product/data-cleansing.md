---
title: Data cleansing
description: "Skippr ELT evolves schemas when types and fields change. Only unparseable rows are dead-lettered, so bronze tables stay queryable as sources drift."
---

# Data cleansing

Wrong types, new fields, and structural changes do not stop ingestion. Skippr evolves the schema. Records are dead-lettered only when they are genuinely unparseable.

## What happens on drift

- A field changes type: Skippr adds a new column. Existing data stays untouched.
- New fields appear: they are added automatically.
- Nested structures reorganize: maps can become records, arrays can gain element types.

Only truncated JSON, binary garbage, or irrecoverable encoding is quarantined. Dead letters are stored as queryable Parquet with the original record, error, run ID, and timestamp. Nothing is silently dropped.

## Pipeline

1. **Parse** — compare each record to the current schema.
2. **Evolve** — add columns and fields so data keeps flowing.
3. **Dead-letter** — quarantine unparseable records.
4. **Report** — you can see what evolved and what was quarantined.

## Related

- [Schema discovery](/elt/product/schema-discovery)
- [Troubleshooting](/elt/operations/troubleshooting)
