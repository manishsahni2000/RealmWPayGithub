exports = async function(payload,bucketname,key) {
  const S3 = require('aws-sdk/clients/s3'); // require calls must be in exports function
  const s3 = new S3({
    accessKeyId: context.values.get("accessKeyId"),
    secretAccessKey: context.values.get("secretAccessKey"),
    region: "ap-southeast-2",
    maxRetries:10
  });
  
  const encodedJsonObject = Buffer.from(EJSON.stringify(payload)).toString('base64'); 
  
  
  console.log(' S3 Object is '+ EJSON.stringify(s3))

  const putResult = await s3.putObject({
    Bucket: bucketname,
    Key: key,
    Body: EJSON.stringify(payload),
   //Body: encodedJsonObject,
    //ContentEncoding: 'gzip'
  }).promise();
  
  console.log('Done with the call')
}

