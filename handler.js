'use strict';
require('dotenv').config()
const {
  getFile,
  saveToS3,
} = require('./src');


const path = require('path');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
AWS.config.setPromisesDependency(Promise);
const bucket = process.env.BUCKET_NAME;
const { ungzip } = require('node-gzip');
//const urls = [] => this will need to be populated.
const urls = ['http://public-data.lordsandknights.com/LKWorldServer-RE-US-1/alliances.json.gz', 'http://public-data.lordsandknights.com/LKWorldServer-RE-US-1/players.json.gz', 'http://public-data.lordsandknights.com/LKWorldServer-RE-US-1/habitats.json.gz'];
const name = ['alliances', 'players', 'habitats']
const worldGame = []

for (let i = 0; i < urls.length; i++) {
  name.map(e => {
    if (urls[i].match(e)) {
      const world = {
        'title': `${Date.now()}-209-${e}`,
        'titleJson': `${Date.now()}-209-${e}.json`,
        'url': urls[i]
      };
      worldGame.push(world);
    }
  })
}

module.exports.launch = async (event, context) => {
  for (let i = 0; i < worldGame.length; i++) {
    await getFile(worldGame[i])
      .then(async res => {
        const buffering = await res.body.buffer()
        const buffered = await {
          'title': res.title,
          'body': buffering
        }
        return buffered;
      })
      .then(res => saveToS3(res))
      .then(() => {
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Your function executed successfully!',
          })
        };
      })
      .catch(err => new Error(`Error scraping: ${JSON.stringify(err)}`))
  }

};

module.exports.deserialize = async (event, context) => {
  console.log('message', event.Records[0])
  let { body } = event.Records[0]
  const params = {
    Bucket: bucket,
    Key: body,
  }
  let { Body } = await s3.getObject(params).promise();
  let decompressed = await ungzip(Body);
  const asString = decompressed.toString();
  const sentparams = {
    Bucket: bucket,
    Key: `${body}.json`,
    Body: asString
  }
  let data = await s3.putObject(sentparams).promise();
  return console.log("Success", data);
}







