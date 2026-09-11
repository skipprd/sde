---
description: "Run skippr doctor before sync or model: checks skippr.yml, warehouse and source credentials, binaries, and connectivity so failures show up early."
---
# skippr doctor

A pre-flight check that verifies everything is wired up correctly before you run the pipeline. Run it whenever something doesn't look right -- it checks config, credentials, binaries, and connectivity.

## Usage

```bash
skippr doctor
```

## Checks performed

| Check | What it verifies |
|---|---|
| Config file | `skippr.yml` exists in the current directory |
| Warehouse | A warehouse is configured via `connect warehouse` |
| Source | A source is configured via `connect source` |
| `dbt` binary | The `dbt` CLI is on PATH (Python venv must be active) |
| Python | `python3` or `python` is on PATH |
| Authentication | Logged in via `skippr user login` or `SKIPPR_API_KEY` is set |
| `LLM_API_KEY` | Whether a custom LLM key is set (informational -- the server provides one automatically) |
| Warehouse auth | Provider-specific credential checks (e.g. Snowflake account, key-pair auth) |

## Example output

```
  [ok]   skippr.yml found
  [ok]   warehouse configured (snowflake)
  [ok]   source configured (mssql)
  [ok]   dbt binary found on PATH
  [ok]   python found on PATH
  [ok]   authenticated (credentials or SKIPPR_API_KEY)
  [ok]   LLM_API_KEY not set (will use server-provided key)
  [ok]   SNOWFLAKE_ACCOUNT is set
  [ok]   SNOWFLAKE_USER is set
  [ok]   SNOWFLAKE_PRIVATE_KEY_PATH is set (key-pair auth)

All checks passed. Run 'skippr sync --pipeline <name> --once', then 'skippr model --pipeline <name>'.
```

## Exit codes

| Code | Meaning |
|---|---|
| 0 | All checks passed |
| 1 | One or more checks failed (details printed inline) |
