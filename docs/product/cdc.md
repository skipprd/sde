---
title: Change data capture
description: "Skippr CDC captures inserts, updates, and deletes and applies them with order-token guards so warehouse tables match source final state, not a log dump."
---

# Change data capture

Capture every insert, update, and delete from supported source databases and apply them to your warehouse with order-token guards and tombstone anti-resurrect protection.

Full contract: [CDC overview](/elt/cdc/overview) and [CDC guarantees](/elt/cdc/guarantees).

## How it runs

1. **Connect** — attach to the source change log (Postgres WAL, MySQL binlog, MongoDB oplog, DynamoDB Streams, or Kafka topics). See [CDC sources](/elt/cdc/sources).
2. **Capture** — tag each row with mutation kind, event ID, and a lexicographic order token; write to the WAL.
3. **Apply** — upsert-if-newer with order-token guards; deletes use tombstones so stale writes cannot resurrect rows. See [CDC destinations](/elt/cdc/destinations).
4. **Verify** — target state converges on source state; resume from the stored checkpoint on restart.

## Related

- [CDC recipes](/elt/cdc/recipes)
- [CDC configuration](/elt/cdc/configuration)
- [Data integration](/elt/product/data-integration)
