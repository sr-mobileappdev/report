'use strict'

const { createLogStream } = require('../aws/cwl.js')

let action

const wrapper = async (params) => {
  try {
    await createLogStream(params)
    action.resolve()
  } catch (exception) {
    action.reject(`[createLogStream] ${exception.message}`);
  }
}

module.exports = (params) =>
  new Promise((resolve, reject) => {
    action = { resolve, reject }
    wrapper(params)
  })
