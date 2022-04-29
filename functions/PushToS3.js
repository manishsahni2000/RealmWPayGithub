exports = async function(groupId, host, logType){
  
var zlib = require("zlib");
const username = context.values.get("publickey");
console.log("username is "+username);
var startDate = "1646223132"
var endDate = "1646223152"

  const password = context.values.get("privatekey");
  console.log("password is "+password);
  groupId="5e5fbb4e0c04a970090f6686";
  host="cluster0-shard-00-00.q8vwk.mongodb.net";
  logType="mongodb";


  const arg = { 
    scheme: 'https', 
    host: 'cloud.mongodb.com', 
    path: 'api/atlas/v1.0/groups/' + groupId + '/clusters/' + host + '/logs/' + logType + '.gz',//+ '?' +'startDate='+startDate+'&endDate='+endDate, 
    username: username, 
    password: password,
    headers: {'Content-Type': ['application/json'], 'Accept-Encoding': ['application/gzip']},
    digestAuth:true,
    query: {
    "startDate": [startDate],
    "endDate": [endDate]
  }
  };
  

  
  console.log('hey'+arg.path)
  response = await context.http.get(arg)
  payload = response.body.text();
  console.log(payload)
  
  if (response.status == 404) {
    console.log("Failed");
    return
  }


  
  context.functions.execute("insertToS3", payload, "manishsahnibuckets","logs");
  //context.functions.execute("insertLogsToDB", payload,"manishsahnibuckets","logs");

};