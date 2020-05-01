var mongoose = require('mongoose');

mongoose.connect('mongod://localhost/WikipediaArticles', { useNewUrlParser: true}, function () {
    console.log('mongod connected')
})

module.exports = mongoose;