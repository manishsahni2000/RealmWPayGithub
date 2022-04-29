// This function is the webhook's request handler.
exports = function(payload, response) {
 
    const {arg1} = payload.query; // ES6 , search term
  
    console.log("arg1: ", arg1);
    
    // Querying a mongodb service:
     const collection = context.services.get("mongodb-atlas").db("sample_mflix").collection("movies");

   return collection.aggregate([
 {$match: {
  title:arg1
}}
]);
};