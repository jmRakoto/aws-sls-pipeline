# AWS Serverless Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Faws_sls_pipeline&query=%24.version)](https://pkg.fluentci.io/aws_sls_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.37)
[![](https://img.shields.io/codecov/c/gh/jmRakoto/aws-sls-pipeline)](https://app.codecov.io/gh/jmRakoto/aws-sls-pipeline)

A ready-to-use CI/CD Pipeline for deploying aws serverless

## 🚀 Usage

Run the following command:

```bash
fluentci run aws_sls_pipeline
```

## Environment Variables

| Variable          | Description                |
| ----------------- | -------------------------- |
| REGION            | Your aws region            |
| AWS_ACCESS_KEY_ID | Your aws access key id     |
| SECRET_ACCESS_KEY | Your aws secret access key |

## Jobs

| Job    | Description                 |
| ------ | --------------------------- |
| deploy | Deploy aws serverless lamda |
