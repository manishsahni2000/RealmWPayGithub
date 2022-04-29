exports = async function(changeEvent) {
  // Hey Testing Hello it again Manish with Poorna and Matt is actually Testing changes deployed to Realm function okk
  console.log("ChangeEvent: ", JSON.stringify(changeEvent));
  const account_id = changeEvent.fullDocument.account_id;
  const accounts = context.services.get("mongodb-atlas").db("sample_analytics");
  const transactions = context.services.get("mongodb-atlas").db("sample_analytics");
  
  const totalCount = await accounts.collection('accounts').count({"account_id":account_id});

  if(totalCount !== 0) {
    all_accounts = accounts.find({"account_id": account_id}).toArray();
    transactions.insertMany(all_accounts);
  }
};
