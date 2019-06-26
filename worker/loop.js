'use strict'

module.exports = async (awsLogFunc, params, nextTokenName, processResults) => {
  try {
    let finalResults, resultCount;

    // loop over log streams for the log group OR log events for the log stream
    do {
      const awsLogFuncResult = await awsLogFunc(params)      
      const nextToken = awsLogFuncResult[nextTokenName]

      const nextTokenIsUnique = Boolean(
        nextToken
        &&
        (
          nextTokenName === 'nextToken'
          ||
          (nextTokenName === 'nextForwardToken' && params[nextTokenName])
        )
        &&
        !(nextToken === params[nextTokenName])
      )
      finalResults = await processResults(awsLogFuncResult)

      if(nextTokenIsUnique)
        params[nextTokenName] = nextToken
      else
        delete params[nextTokenName]
    } while (params[nextTokenName])
    return finalResults;
  } catch (exception) {
    throw new Error(`\n[worker] loop\n${exception}\n`)
  }
}
