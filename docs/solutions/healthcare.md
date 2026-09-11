---
title: ELT for healthcare
description: "Unify clinical and operational data with self-hosted Skippr ELT. Discover EHR database schemas, load a warehouse, and generate analytics-ready dbt."
---

# ELT for healthcare

Unify clinical and operational data with Skippr Cloud ELT. Run the runner in your environment, discover schemas from EHR databases, and land analytics-ready tables you own.

See [ELT product](/elt/product/) and [Install](/elt/getting-started/install).

## The data problem

| Challenge | What you see |
|-----------|----------------|
| EHR silos | Patient and operational data live in Epic, Cerner, and specialty systems that do not share a model. |
| PHI and access control | Every pipeline must protect PHI, enforce access, and support audit. |
| Manual reporting | Analysts export from several systems and reconcile in spreadsheets. |

## How Skippr Cloud ELT helps

- Discover and evolve schemas from clinical databases without a separate documentation project. See [Schema discovery](/elt/product/schema-discovery).
- Standardize records before they reach analytics layers. See [Data cleansing](/elt/product/data-cleansing).
- Generate bronze, silver, and gold dbt for clinical analytics. See [Data modeling](/elt/product/data-modeling).

Row-level source data moves from the machine running `skippr` to your destination. Authentication and control-plane services are Cloud-backed.

## Sources teams use

- [MSSQL](/elt/connectors/sources/mssql) (Epic / Cerner patterns) — hub: [MSSQL](/elt/sources/mssql)
- [PostgreSQL](/elt/connectors/sources/postgres) — hub: [PostgreSQL](/elt/sources/postgres)
- [SFTP](/elt/connectors/sources/sftp) (HL7 / FHIR exports) — hub: [SFTP](/elt/sources/sftp)
- [S3](/elt/connectors/sources/s3) — hub: [S3](/elt/sources/s3)
- [MongoDB](/elt/connectors/sources/mongodb) — hub: [MongoDB](/elt/sources/mongodb)

## Warehouses

- [Snowflake](/elt/connectors/destinations/snowflake) — hub: [Snowflake](/elt/warehouses/snowflake)
- [BigQuery](/elt/connectors/destinations/bigquery) — hub: [BigQuery](/elt/warehouses/bigquery)
- [Redshift](/elt/connectors/destinations/redshift) — hub: [Redshift](/elt/warehouses/redshift)

## Compliance

- Self-hosted runner: source data stays on the path you configure.
- Additive schema evolution and dbt models you can review in git.
- This page is not a HIPAA certification. Confirm controls with your compliance team.

## Next

- [Install](/elt/getting-started/install)
- [Contact](/contact)
- [ELT solutions](/elt/solutions/)
