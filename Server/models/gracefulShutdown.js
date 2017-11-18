/*
=====
DB Graceful shutdown.

** Check AWS event emiter when process is terminated. Assuming it is SIGINT for now? #2
=====
*/

module.exports = (db) => {

  // Event listeners to terminate the db connection
  // Nodemon emits SIGUSR2 when it restarts
  process.once('SIGUSR2', () => {
    shutdown('nodemon restarts.', ()  =>{
      process.kill(process.pid, 'SIGUSR2');
    })
  });
  // Unix emits SIGINT when closed
  process.on('SIGINT', () => {
    shutdown('app termination.', () => {
      process.exit(0);
    })
  });
  // Heroku emits SIGTERM when closed
  process.on('SIGTERM', () => {
    shutdown('Heroku app shutdown.', () => {
      process.exit(0);
    })
  });

  // Called once the app is terminated
  function shutdown(msg, callback) {
    db.close(() => {
      console.log('Mongoose disconnected through ' + msg);
      callback();
    });
  };
}