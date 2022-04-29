exports = async function(arg){
 
const username = context.values.get("publickey");
console.log("username is "+username);
var startDate = "1646223132"
var endDate = "1646223152"

  const password = context.values.get("privatekey");
  console.log("password is "+password);
  groupId="5e5fbb4e0c04a970090f6686";
  host="cluster0-shard-00-00.q8vwk.mongodb.net";
  logType="mongodb";
  
  
  
  const config = { 
   // scheme: 'https', 
   // host: 'cloud.mongodb.com', 
   // path: 'api/atlas/v1.0/groups/' + groupId + '/clusters/' + host + '/logs/' + logType + '.gz',//+ '?' +'startDate='+startDate+'&endDate='+endDate, 
    //username: username, 
    //password: password,
    headers: {'Content-Type': ['application/json'], 'Accept-Encoding': ['application/gzip']},
    //url: 'https://cloud.mongodb.com'+'api/atlas/v1.0/groups/' + groupId + '/clusters/' + host + '/logs/' + logType + '.gz
  }
  
  
  


  const AxiosDigest = require("axios-digest")
    
  const digestAuth = new AxiosDigest(
    username,
    password
  );
  
  let payload = { startDate: startDate, endDate: endDate };

  const params = new url.URLSearchParams(payload);
  
  const response = await digestAuth.get(
    'https://cloud.mongodb.com'+'api/atlas/v1.0/groups/' + groupId + '/clusters/' + host + '/logs/' + logType + '.gz${params}'
  );
  
  console.log('response is '+response)

};