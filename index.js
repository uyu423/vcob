const CronJob = require('cron').CronJob;
const { Ticker } = require('./service');

const process = new CronJob('0 * * * * *', async () => {
  try {
    await Ticker.storeTickersProcess();
  } catch (error) {
    console.error(`[${new Date()}] Error: ${error}`);
  }
}, () => {
  console.error(`[${new Date()}] Process Fucked.`);
}, true);

console.log('VCOB Start');
