module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "AWS Serverless x fluentci test",
      },
      null,
      2
    ),
  };
};
