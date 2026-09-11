---
description: "Log in, manage API keys, and check usage with skippr user. SMS login provisions a hosted LLM key and cloud storage—no OpenAI account required."
---
# skippr user

Manage your Skippr account -- authentication, API keys, billing, and usage. See [Authentication](../getting-started/authentication.md) for the getting-started guide.

Skippr Cloud ELT bills the same four meters as other Cloud capabilities: **vCPU time**, **memory time**, **bytes stored**, and **network bytes**. There is no monthly seat, MAR pack, or named usage-threshold SKU. The runner runs on your host; Cloud-backed control-plane and hosted LLM usage consume those meters.

## Subcommands

### login

Sign up or log in. Verify via SMS and you're authenticated -- an LLM key and cloud storage are provisioned automatically.

```bash
skippr user login
```

Session tokens are stored in `~/.skippr/credentials.json`.

### logout

Remove local credentials.

```bash
skippr user logout
```

### account

Check billed usage against the four Cloud meters (vCPU time, memory time, bytes stored, network bytes) and remaining prepaid funds.

```bash
skippr user account
```

### buy-credits

Add prepaid funds that pay those meters. Opens a Stripe checkout. This command does not sell credits, seats, or compute-unit packs.

```bash
skippr user buy-credits --amount <DOLLARS>
```

**Examples:**

```bash
skippr user buy-credits --amount 25     # add $25
skippr user buy-credits --amount 100    # add $100
skippr user buy-credits --amount 500    # add $500
```

Minimum $5, maximum $10,000 per transaction. Usage and remaining funds are visible via `skippr user account`.

### create-api-key

Create an API key for CI/CD or automation. Requires an active login.

```bash
skippr user create-api-key --name "github-actions"
```

The key (prefixed `sk_live_`) is shown once and can't be retrieved again. Set it as `SKIPPR_API_KEY` in your CI environment.

### list-api-keys

List all API keys on your account.

```bash
skippr user list-api-keys
```

### revoke-api-key

Revoke a key by ID (shown in `list-api-keys` output).

```bash
skippr user revoke-api-key --key-id <id>
```
