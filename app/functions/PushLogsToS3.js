exports = async function(groupId, host, logType){
  
const username = context.values.get("publickey");
console.log("username is "+username);

const password = context.values.get("privatekey");
console.log("password is "+password);

//var startDate = "1646223132" // we need to convert the current date to epoch time
//var endDate = "1646223532"   // this can be +5 minutes for the current epoch time

var endDate = new Date();
var numberOfMlSecondsForEndDate = endDate.getTime();
var subtractMlSeconds = 60 * 10 *1000;
var startDate = new Date(numberOfMlSecondsForEndDate - subtractMlSeconds);


// Tested for 12:12 - 1646223132 to 12:45 - 1646225132 which is 30 minutes took 20-30 sec file size 52.3 KB
// Tested for 12:12 - 1646223132 to 12:45 - 1646228132 which is 1 hour 30 minutes took 1 minute 5 sec file size 119.9KB

  groupId="5e5fbb4e0c04a970090f6686";
  host="cluster0-shard-00-00.q8vwk.mongodb.net";
  logType="mongodb-audit-log";


  const arg = { 
    scheme: 'https', 
    host: 'cloud.mongodb.com', 
    path: 'api/atlas/v1.0/groups/' + groupId + '/clusters/' + host + '/logs/' + logType + '.gz', 
    username: username, 
    password: password,
    headers: {'Content-Type': ['application/json'], 'Accept-Encoding': ['application/gzip']},
    digestAuth:true,
    query: {
    "startDate": [[Math.round(startDate / 1000).toString()]],
    "endDate": [[Math.round(endDate / 1000).toString()]]
  }
  };
  
  response = await context.http.get(arg)
  payload = response.body;
  console.log(payload)
  
  if (response.status == 404) {
    console.log("Failed");
    return
  }
  
  context.functions.execute("insertToS3", payload, "manishsahnibuckets","logs"+(new Date()).toJSON()+"");

};