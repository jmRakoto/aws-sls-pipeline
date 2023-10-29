import Client, { connect } from "../../deps.ts";

export enum Job {
  // build = "build",
  deploy = "deploy",
}

export const exclude = ["node_modules"];

export const deploy = async (
  src = ".",
  accessKey?: string,
  secretKey?: string,
  region?: string
) => {
  await connect(async (client: Client) => {
    const context = client.host().directory(src);
    const ctr = client
      .pipeline(Job.deploy)
      .container()
      .from("pkgxdev/pkgx:latest")
      .withExec(["apt-get", "update"])
      .withExec(["apt-get", "install", "-y", "ca-certificates"])
      .withExec(["pkgx", "install", "node", "bun"])
      .withExec(["bun", "install", "--global", "serverless"])
      .withEnvVariable("PATH", "/root/.bun/bin:$PATH", { expand: true })
      .withMountedCache(
        "/app/dist",
        client.cacheVolume("aws-serverless-public")
      )
      .withEnvVariable("REGION", Deno.env.get("REGION") || region!)
      .withEnvVariable(
        "AWS_ACCESS_KEY_ID",
        Deno.env.get("AWS_ACCESS_KEY_ID") || accessKey!
      )
      .withEnvVariable(
        "SECRET_ACCESS_KEY",
        Deno.env.get("SECRET_ACCESS_KEY") || secretKey!
      )
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec([
        "sh",
        "-c",
        'mkdir ~/.aws && cp config ~/.aws && cp credentials ~/.aws && sed -i "s|defaultRegion|$REGION|g" ~/.aws/config && sed -i "s|keyId|$AWS_ACCESS_KEY_ID|g" ~/.aws/credentials && sed -i "s|accessKey|$SECRET_ACCESS_KEY|g" ~/.aws/credentials',
      ])
      .withExec([
        "serverless",
        "deploy",
        "--stage",
        "dev",
        "--aws-profile",
        "default",
      ]);

    await ctr.stdout();
  });

  return "Done";
};

export type JobExec = (
  src?: string,
  accessKey?: string,
  secretKey?: string,
  region?: string
) => Promise<string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.deploy]: deploy,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.deploy]: "Deploy AWS Serverless",
};
