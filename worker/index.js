'use strict'
/*
create exclusion urls array
*/
// const { white, blue, red, yellow } = require('chalk')

// const createLogStream = require('../api/actions/createLogStream.js')
const describeLogStreams = require('../api/actions/describeLogStreams.js')

const loop = require('./loop.js')
const processStreams = require('./streams.js')

const { bjcType, eId } = process.env
const logGroupName = `${bjcType}${eId}`;// THIS SEMI-COLON IS REQUIRED

(async () => {
  const params = { logGroupName }
  const finalResults = await loop(describeLogStreams, params, 'nextToken', processStreams)
  console.log()
  console.log(`finalResults ${logGroupName}`)
  console.log(JSON.stringify(finalResults, null, 1))
  console.log('BJC', finalResults.numbBjcStreams, finalResults.resultCount)
  if (parseInt(finalResults.numbBjcStreams) === parseInt(finalResults.resultCount)) {
    console.log('Matching criteria Success!!!!!!')
  } else {
    console.log('Matching criteria Failure #####')
  }
  console.log()
})()
