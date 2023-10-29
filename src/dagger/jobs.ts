import Client, { connect } from "../../deps.ts";

export enum Job {
  deploy = "deploy",
}

export const exclude = ["node_modules"];

export const deploy = async (
  src = ".",
  accessKey?: string,
  secretAccesKey?: string,
  region?: string,
  stageEnv?: string
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
        Deno.env.get("SECRET_ACCESS_KEY") || secretAccesKey!
      )
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec([
        "sh",
        "-c",
        'mkdir ~/.aws && cp config ~/.aws && cp credentials ~/.aws && sed -i "s|defaultRegion|$REGION|g" ~/.aws/config && sed -i "s|accessKey|$AWS_ACCESS_KEY_ID|g" ~/.aws/credentials && sed -i "s|secretAccessKey|$SECRET_ACCESS_KEY|g" ~/.aws/credentials',
      ])
      .withExec([
        "serverless",
        "deploy",
        "--stage",
        Deno.env.get("STAGE_ENV") || stageEnv!,
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
  secretAccesKey?: string,
  region?: string,
  stageEnv?: string
) => Promise<string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.deploy]: deploy,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.deploy]: "Deploy AWS Serverless",
};
