AWS.config.update({
    "region": "us-east-2",
    "endpoint": "https://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "AKIAZ7JJJKGEBF52EU66",
    "secretAccessKey": "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"
  });
  var docClient = new AWS.DynamoDB.DocumentClient();