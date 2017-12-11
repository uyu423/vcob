const fetch = require('node-fetch');
const config = require('getconfig');
const knex = require('../knex');

exports.storeTickersProcess = async () => {
  const tickers = await getTickersByAPI();
  const targetCurrency = config.TARGET_CURRENCY;
  const result = await saveTickersToDatabase(targetCurrency.map((target) => {
    const { currency, volume, first, last, high, low } = tickers[target];
    return { currency, volume, first, last, high, low };
  }));

  return result;
};

const getTickersByAPI = async () => {
  const { API } = config;
  const response = await fetch(`${API.COINONE.TICKER}${API.COINONE.TICKER_PARAMS}`);
  if (!response.ok) {
    throw new Error(`getTickers Coinone API Error: ${response.status}`);
  }
  const tickers = await response.json();

  return tickers;
};

const saveTickersToDatabase = async (data) => {
  try {
    const result = await knex('ticker').insert(data);
    return result;
  } catch (error) {
    console.error(error);
  }
  throw new Error('Database Catch Syntax Error');
};
