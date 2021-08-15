const mongoose = require('mongoose');

module.exports = {
  init: () => {
    const dbOptions = {
      useNewUrlParse: true,
      useUnifiedTopology: true,
      autoIndex: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    };
    mongoose.connect('mongodb+srv://dbuser001:VUFhzygpx0pvXy8L@myverify-database.akds3.mongodb.net/main?retryWrites=true&w=majority')

    mongoose.set('useFindAndModify', false)
    mongoose.Promise = global.Promise
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected :)')
    })

    mongoose.connection.on('err', err => {
      console.log(`Something messed up... :/ \nError: ${err.stack}`)
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB has disconnected ;C')
    })
    })
  }
}