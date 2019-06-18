'use strict'
// node --max-old-space-size=16000 . job '11 17 2'

const spawn = require('child_process').spawn
const numCPUs = require('os').cpus().length

const bjcType = process.argv[2]
const eIds = process.argv[3].split(' ')
const numbEids = eIds.length

if(process.argv.length !== 4){
  console.log(`\nerror\ninvalid args: bjcType: ${bjcType} eIds: ${eIds}\n`)
  process.exit()
} else if(numbEids > numCPUs){
  console.log(`\nerror\nnumbEids: ${numbEids} > numCPUs: ${numCPUs}\n`)
  process.exit()
} else if(!['bio', 'job', 'contact'].includes(bjcType)){
  console.log(`\nerror\ninvalid bjcType: ${bjcType}\n`)
  process.exit()
}

// https://nodejs.org/api/process.html
const unhandledRejections = new Map()

process.on('unhandledRejection', (reason, p) => {
  console.warn(`master ${process.pid} unhandled rejection at: ${p} reason: ${reason}`)
  unhandledRejections.set(p, reason)
})

process.on('rejectionHandled', p => {
  console.warn(`master ${process.pid} rejection handled at: ${p}`)
  unhandledRejections.delete(p)
})

for (let i = 0; i < numbEids; i++) {
  const subprocess = spawn(
    '/usr/local/bin/timeout',
    [
      '-s',
      '9',
      '5m',
      process.argv[0],
      './worker'
    ],
    {
      // detached: true,
      stdio: 'inherit',//'ignore',
      env: {
        bjcType,
        eId: eIds[i]
      }
    }
  )

  // subprocess.unref()
}
