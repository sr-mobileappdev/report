'use strict'

const { describeLogStreams } = require('../aws/cwl.js')

let action

const wrapper = async (params) => {
  try {
    const data = await describeLogStreams(params)
    action.resolve(data)
  } catch (exception) {
    action.reject(`[describeLogStreams] ${exception.message}`)
  }
}

module.exports = (params) =>
  new Promise((resolve, reject) => {
    action = { resolve, reject }
    wrapper(params)
  })
