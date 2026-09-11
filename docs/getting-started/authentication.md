---
description: "Log in with sde user login to unlock hosted LLM modeling and cloud run storage. Source rows stay on your side by default; CI uses API keys."
---
# Authentication

Authentication connects the runner to your Skippr account. Once authenticated, you get a hosted LLM key by default (no OpenAI account needed), cloud-backed control-plane services, and usage metering on Skippr Cloud's four billing meters: **vCPU time**, **memory time**, **bytes stored**, and **network bytes**.

## Quick start

For local development, log in interactively:

```bash
sde user login
```

You'll verify via SMS and accept the Skippr EULA once for your account: [Skippr EULA](/terms/eula). That's it -- you're ready to run pipelines.

## What authentication does and does not do

- **Does**: authenticate the runner, unlock hosted LLM access by default, and connect the run to Skippr's cloud-backed control plane.
- **Does not**: send row-level source data through Skippr's cloud path.
- **By default**: AI-assisted modeling uses schema metadata. Data samples are optional and off by default.

## CI/CD and automation

Create an API key for non-interactive environments:

```bash
sde user create-api-key --name "github-actions"
```

The key (prefixed `sk_live_`) is shown once -- save it securely. Then set it in your CI environment:

```bash
export SKIPPR_API_KEY="sk_live_..."
sde sync --pipeline <name> --once   # authenticates automatically
sde model --pipeline <name>         # uses the same API key for modeling and metering
```

No setup scripts, no token refresh logic. `sde sync` and `sde model` detect the key and handle the rest.

## Managing API keys

```bash
sde user list-api-keys
sde user revoke-api-key --key-id <id>
```

## Details

### Auth priority

When an authenticated command starts, it resolves credentials in this order:

1. **`SKIPPR_API_KEY` env var** -- exchanged for session tokens (CI/CD)
2. **`~/.skippr/credentials.json`** -- from interactive login

If neither is present, the CLI exits with a clear error.

### Credential storage

Interactive login stores tokens in `~/.skippr/credentials.json`. These are session tokens, not passwords.

### Billing

Every run meters Cloud-backed usage (control plane and hosted LLM) as **vCPU time**, **memory time**, **bytes stored**, and **network bytes**. The runner itself runs on your host. If prepaid funds are exhausted:

```bash
sde user buy-credits --amount 25
```

`buy-credits` adds funds that pay those meters — not a separate credit SKU. See [`sde user`](../cli/user.md) for all account commands.
