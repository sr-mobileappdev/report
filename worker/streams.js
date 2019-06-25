'use strict'

const getLogEvents = require('../api/actions/getLogEvents.js')

const loop = require('./loop.js')
const processEvents = require('./events.js')

const { bjcType, eId } = process.env
const logGroupName = `${bjcType}${eId}`

const VALID_STREAM_TYPES = ['bjc', 'log', 'ivalid', 'error']
const totalForAllStreams = {}

async function perBatchOf50Streams (logStreams) {
  const batchResults = {
    numbStreams: logStreams.length,

    numbBjcStreams: 0,
    numbLogStreams: 0,
    numbInvalidStreams :0,
    numbErrorStreams: 0,

    invalidLogStreamName: [],
    noEventsForLogStream: [],
    invalidStreamType: []
  }

  for (let i = 0; i < logStreams.length; i++) {
    const { logStreamName } = logStreams[i]

    if(logStreamName.indexOf('_') === -1)
      batchResults.invalidLogStreamName.push(logStreamName)

    const params = { logGroupName, logStreamName }
    const logEventsForCount = await getLogEvents(params)

    if(!logEventsForCount.events.length)
      batchResults.noEventsForLogStream.push(logStreamName)

    const streamType = logStreamName.split('_')[1]

    if(logStreamName === 'master_log'){
      // loop over stream events
      const resultCount = await loop(getLogEvents, params, 'nextForwardToken', processEvents, true)

      batchResults.resultCount = resultCount;
// console.log(eventResults)
    }
    else if(streamType === 'bjc')
      ++batchResults.numbBjcStreams
    else if(streamType === 'log')
      ++batchResults.numbLogStreams
    else if(streamType === 'invalid')
      ++batchResults.numbInvalidStreams
    else if(streamType === 'error'){
      ++batchResults.numbErrorStreams
      // loop over stream events
      await loop(getLogEvents, params, 'nextForwardToken', processEvents)
// console.log(eventResults)
    } else {
      const msg = `streamType: ${streamType} logStreamName: ${logStreamName}`
      batchResults.invalidStreamType.push(msg)
    }
  }

  return batchResults
}

module.exports = async (awsLogFuncResult) => {
  // batch has max 50 streams; each stream has multiple events
  const batchResults = await perBatchOf50Streams(awsLogFuncResult.logStreams)

  // add batch values to total for all streams
  Object.keys(batchResults).forEach(key => {
    const value = batchResults[key]

    if(totalForAllStreams.hasOwnProperty(key)){
      if(typeof value === 'number')
        totalForAllStreams[key] += value
      else
        totalForAllStreams[key] = totalForAllStreams[key].concat(value)
    }
    else
      totalForAllStreams[key] = value
  })

  return totalForAllStreams
}
