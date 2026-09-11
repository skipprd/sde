---
description: "Connect a warehouse and source with sde connect. Interactive prompts or flags write skippr.yml—Postgres, Snowflake, S3, Kafka, and more."
---
# sde connect

Wire up your warehouse and data source. Run with flags for scripted setups, or omit them to be prompted interactively.

## Usage

```bash
sde connect warehouse <kind> [flags]
sde connect source <kind> [flags]
```

## Connectors

Each connector has its own dedicated page with full configuration reference, CLI flags, authentication, and troubleshooting.

- [Source Connectors](/connectors/sources/) -- databases, object stores, streaming, HTTP, and more
- [Destination Connectors](/connectors/destinations/) -- warehouses, cloud storage, messaging, and more

## Notes

- `connect` commands update `skippr.yml` in the current directory. Run `sde init` first. `connect warehouse` writes `data_sinks` only. `connect source` writes `data_sources`. Logical names such as `warehouse` and `source` are examples, not reserved words.
- Sensitive values (passwords, keys, connection strings) should use environment variable references in the config and be set in your shell or `.env` file -- they're never stored in plain text.
