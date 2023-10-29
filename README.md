# AWS Serverless Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Ffirebase_pipeline&query=%24.version)](https://pkg.fluentci.io/firebase_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.37)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/firebase-pipeline)](https://codecov.io/gh/fluent-ci-templates/firebase-pipeline)

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
| build  | Build your project.         |
| deploy | Deploy to firebase hosting. |
