const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cookit', 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
      }
);

module.exports = mongoose.connection;
