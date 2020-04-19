const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/fifagkroomdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection
.on('connected', () => {
console.log(`Mongoose connection open on mongodb://localhost:27017/fifagkroomdb`);
})
.on('error', (err) => {
console.log(`Connection error`);
});

