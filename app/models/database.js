var mongoose = require('mongoose');

mongoose.connect('mongod://localhost/wikipedia', { useNewUrlParser: true}, function () {
    console.log('mongod connected')
})

module.exports = mongoose;