'use strict'

module.exports = (stream) => {

  const logsArray = stream.events;
  let count;
  for (let i = 0; i < logsArray.length; i++) {
    if (logsArray[i].message.includes("count:")) {
      count = logsArray[i].message.substring(7).trim();
      console.log('Master Log count......', count);
    }
  }
  return count;
}
