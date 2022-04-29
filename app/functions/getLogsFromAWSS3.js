exports = async function(bucketname,key){
  
  var zlib = require('zlib');
  const S3 = require('aws-sdk/clients/s3');
  const s3 = new S3({
    accessKeyId: "AKIAR4BA5IYX7F4AWPJT",
    secretAccessKey: "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",
    region: "ap-southeast-2",
    maxRetries:10
  });

 const getResult = await s3.getObject({
    Bucket: "manishsahnibuckets",
    Key: "logs",
  }).promise();
  
  const fileContent = getResult.Body.toString('base64');
  
  console.log("getResult is "+EJSON.stringify(fileContent));
  
  base64_decode(EJSON.stringify(fileContent), 'mongodb_log.txt');
  
  function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var path = '/home/ec2-user/node_dir/mongodblogs.gz';
    var buf = new Buffer(base64str, 'base64');
    // write buffer to file
    //fs.writeFileSync(file, bitmap);
    zlib.unzip(buf, function (err, buffer) {          // decompress the content
          if (err) throw err;                             // handle decompression error
          var content = buffer.toString('base64');          // encode in utf-8
          console.log(content)
          /*fs.writeFile(path, content, function (err) {    // write file to path
            if (err) throw err;                           // handle writing to file error
    });*/
    console.log('******** File created from base64 encoded string ********');
}
)}
};