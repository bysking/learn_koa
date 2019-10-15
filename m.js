const fs = require('fs')
const child_progress = require('child_process')

for(let i = 0; i < 3; i++) {
  const workerProgress = child_progress.exec('node s.js ', i, function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack)
      console.log('Error code:' + error.stack)
      console.log('Signal recieved:' + error.signal)
    }
    console.log('start---------------')
    console.log('stdout', stdout)
    console.log('stderr', stderr)
    console.log('end---------------')
  })
  workerProgress.on('exit', function(code) {
    console.log('子进程已退出， 退出码', code)
  })
}