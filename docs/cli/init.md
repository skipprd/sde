---
description: "Create a Skippr project with sde init: skippr.yml, .env.example, and the next steps to connect a source and warehouse, then sync and model."
---
# sde init

Create a new project. This is always the first step -- it sets up the config file and tells you exactly what to do next.

## Usage

```bash
sde init <project-name>
```

## What it creates

- `skippr.yml` -- your project config (warehouse, source, and pipeline settings all live here).
- `.env.example` -- lists the environment variables you'll need.
- project scaffolding required for the runner and generated dbt output.

## Arguments

| Argument | Required | Description |
|---|---|---|
| `project-name` | Yes | Project identifier. Used as the pipeline name and dbt schema prefix (e.g. `my_project_silver`). |

## Example

```bash
mkdir my-workspace && cd my-workspace
sde init mssql-migration
```

Output:

```
Initialised project 'mssql-migration' in /Users/me/my-workspace

Next steps:
  sde connect warehouse snowflake
  sde connect source mssql
  sde doctor
  sde sync --pipeline mssql-migration --once
  sde model --pipeline mssql-migration
```

## Notes

- Running `init` in a directory that already has `skippr.yml` is idempotent. It will print that the project is already initialised and leave the existing files alone.
- Use [`sde reset --pipeline <name>`](reset.md) if you want to clear Skippr-owned runtime and modeling state for a configured pipeline.
- The project name should be a valid identifier (letters, numbers, underscores). It's used to name your warehouse schemas.
