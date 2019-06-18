'use strict'

const cwl = require('./index')

const createLogStream = (params) =>
  new Promise((resolve, reject) => {
    cwl.createLogStream(params, (error, data) => {
      if (error) reject(error)
      if (data) resolve(data)
    })
  })

const putLogEvents = (params) =>
  new Promise((resolve, reject) => {
    cwl.putLogEvents(params, (error, data) => {
      if (error) reject(error)
      if (data) resolve(data)
    })
  })

const describeLogStreams = (params) =>
  new Promise((resolve, reject) => {
    cwl.describeLogStreams(params, (error, data) => {
      if (error) reject(error)
      if (data) resolve(data)
    })
  })

const getLogEvents = (params) =>
  new Promise((resolve, reject) => {
    cwl.getLogEvents(params, (error, data) => {
      if (error) reject(error)
      if (data) resolve(data)
    })
  })

module.exports = { createLogStream, putLogEvents, describeLogStreams, getLogEvents }
