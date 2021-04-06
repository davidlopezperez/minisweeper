const awsServerlessExpress = require('aws-serverless-express');
const app = require('./index');

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Origin" : "'*'", // (* or a specific host)
        "Access-Control-Allow-Credentials" : false // Required for cookies, authorization headers with HTTPS
    },
  }
  return awsServerlessExpress.proxy(server, event, context);
}
