'use strict'
const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })
AWS.config.credentials = new AWS.SharedIniFileCredentials({
  profile: 'robert-mcintosh'
});
module.exports = new AWS.CloudWatchLogs()
