var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/WikipediaArticles', { useNewUrlParser: true, useUnifiedTopology: true  }, function () {
  console.log('mongodb connected')
});

module.exports = mongoose;