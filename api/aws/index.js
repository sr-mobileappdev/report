'use strict'
const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })
module.exports = new AWS.CloudWatchLogs()
