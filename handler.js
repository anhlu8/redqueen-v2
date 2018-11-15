'use strict';
const {
  getFile,
  sqsToLambda,
  lamdaToSqs,
  saveToS3
} = require('./src');

module.exports.launch = async (event, context) => {
  getFile()
    .then(response => response.buffer())
    .then(response => saveToS3(response))
    .then(() => {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Your function executed successfully!',
        })
      };
    })
    .catch(err => new Error(`Error scraping: ${JSON.stringify(err)}`))
};