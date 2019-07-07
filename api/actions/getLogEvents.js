'use strict'

const { getLogEvents } = require('../aws/cwl.js')

let action

const wrapper = async (params) => {
  try {
    const data = await getLogEvents(params)
    action.resolve(data)
  } catch (exception) {
    action.reject(`[getLogEvents] ${exception.message}`)
  }
}

module.exports = (params) =>
  new Promise((resolve, reject) => {
    action = { resolve, reject }
    wrapper(params)
  })
