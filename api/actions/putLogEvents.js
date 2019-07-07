'use strict'

const { putLogEvents } = require('../aws/cwl.js')
const { bjcType, eId } = require('../../cli/args.js')
const describeLogStreams = require('./describeLogStreams.js')

let action

const putNewLogEvents = async (logEvents, workerId) => {
  try {
    const logGroupName = `${bjcType}${eId}`
    const logStreamNamePrefix = workerId || 'master'
    const logStreamName = `${logStreamNamePrefix}_${process.pid}`
    const params = { logGroupName, logStreamName, logEvents }
    console.log('top')
    console.log(logEvents)
    // console.log(`tokenMap[logStreamName] ${tokenMap[logStreamName]}`);
    const result = await describeLogStreams(logStreamNamePrefix)
    console.log(result)
    const stream = result.logStreams.find(stream => {
      return (stream.logStreamName === logStreamName && stream.hasOwnProperty('uploadSequenceToken'))
    })

    if (stream) {
      console.log(`stream.uploadSequenceToken ${stream.uploadSequenceToken}`)
      params.sequenceToken = stream.uploadSequenceToken
    }
    // if(tokenMap[logStreamName])
    //   params.sequenceToken = tokenMap[logStreamName]

    const data = await putLogEvents(params)
    console.log(`new token ${data.nextSequenceToken}`)
    console.log(`same ${params.sequenceToken === data.nextSequenceToken}`)
    console.log('bottom')
    // tokenMap[logStreamName] = data.nextSequenceToken

    action.resolve()
  } catch (exception) {
    action.reject(`[putLogEvents] ${exception.message}`)
  }
}

module.exports = (logEvents, workerId) =>
  new Promise((resolve, reject) => {
    action = { resolve, reject }
    putNewLogEvents(logEvents, workerId)
  })
