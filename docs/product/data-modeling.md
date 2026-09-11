---
title: Data modeling
description: "Turn bronze warehouse tables into dimensions, facts, and metrics with sde model. The agent writes dbt you review, test, and keep in your repo."
---

# Data modeling

After `sde sync` lands bronze data, the Data Agent analyses schemas and produces business-ready models — dimensions, facts, and metrics — as a validated dbt project you can inspect, edit, and run.

AI assists with scaffolding. Schema metadata is the default input; data samples are optional and off by default. See [Vision](/elt/vision).

## Pipeline

1. **Analyse** — schemas, joins, grain, and patterns across landed sources.
2. **Model** — author staging, dimension, and fact SQL as standard dbt.
3. **Validate** — compile and run against your warehouse (`sde test` for dbt tests).
4. **Publish** — materialise tables you query in the warehouse you already use.

When validation fails, the agent reads the error, adjusts the model, and re-validates for common issues. You still review the SQL.

## Related

- [`sde model`](/cli/model)
- [`sde test`](/cli/test)
- [How it works](/getting-started/how-it-works)
