exports = async function () {
  // manish  access mongodb live database editing by Manish to test the event are poushed by github to realm or not.
  const mongoConnection = context.services.get('mongodb-atlas').db('sample_analytics');

  // define article topN aggregate
  const articleAggregate = [{$match: {
  limit:{$gt:7000}
}}, {$out: 'latestData'}];

  const retVal = await mongoConnection.collection('accounts').aggregate(articleAggregate);
  return retVal;
}
