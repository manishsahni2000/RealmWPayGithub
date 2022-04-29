exports =  async function(payload,bucketname,key){
  

    var audit_logs =  await context.services.get("mongodb-atlas").db("auditLog");
    console.log('inside audit logs '+audit_logs);
     bson = {
        'filename': "audit_log.gz",
        'data': payload
      };
    var result =  await audit_logs.collection('audit_logs').insertOne({ user_id: "Manish",audit_logs_file:bson });
    console.log("finished logging "+result);
    
    var logObject = await audit_logs.collection('audit_logs').findOne({ "user_id": "Manish"});
    
    console.log("logObject is "+EJSON.stringify(logObject))
    
  /*const S3 = require('aws-sdk/clients/s3'); // require calls must be in exports function
  const s3 = new S3({
    accessKeyId: "AKIAR4BA5IYX7F4AWPJT",
    secretAccessKey: "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",
    region: "ap-southeast-2",
  });
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
  const putResult = await s3.putObject({
    Bucket: bucketname,
    Key: key,
    Body: EJSON.stringify(logObject),
  }).promise();
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property
  const getResult = await s3.getObject({
    Bucket: bucketname,
    Key: key,
  }).promise();*/

};

