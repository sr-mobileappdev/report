'use strict'

const totalForAllEvents = {}

function perBatchOf50Events (logStreams) {
  const batchCounts = {
    numbStreams: logStreams.length,
    numbBjcStreams: 0,
    numbLogStreams: 0,
    numbInvalidStreams :0,
    numbErrorStreams: 0
  }

  for (let i = 0; i < logStreams.length; i++) {
    const { logStreamName } = stream

    if(logStreamName.indexOf('_') === -1)
      throw new Error(`[streams] invalid stream name: ${logStreamName}`)

    const streamType = logStreamName.split('_')[1]

    if(streamType === 'bjc')
      ++batchCounts.numbBjcStreams
    else if(streamType === 'log')
      ++batchCounts.numbLogStreams
    else if(streamType === 'invalid')
      ++batchCounts.numbInvalidStreams
    else if(streamType === 'error'){
      ++batchCounts.numbErrorStreams
      const eventResults = processEvents(stream)
console.log(eventResults)
    }
    else
      throw new Error(`[streams] invalid stream type: ${streamType} logStreamName: ${logStreamName}`)
  }

  return batchCounts
}

module.exports = (stream) => {
/*
read from error exceptions list
*/
/*
batch eIds  problem
bio-1 11,3  bjc's have the same url
bio-2 14,2  2 only has a master_log, no 14
bio-3 4     4 only has a master_log
*/
console.log(stream)
  // filter stream events; read from error exceptions list
  // const events = perBatchOf50Events(stream)

  // add batch counts to total for all streams
  // Object.keys(events).forEach(key => {
  //   const count = batchCounts[key]
  //
  //   if(totalForAllEvents.hasOwnProperty(key))
  //     totalForAllEvents[key] += count
  //   else
  //     totalForAllEvents[key] = count
  // })

  return totalForAllEvents
}
