const jwt = require('jsonwebtoken');

const secret = 'CooKit-Secret';


module.exports = {
    authMiddleware: function ({ req }) {
      // allows token to be sent via req.body, req.query, or headers
      let token = req.body.token || req.query.token || req.headers.authorization;
  
      // ["Bearer", "<tokenvalue>"]
      if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
      }
  
      if (!token) {
        return req;
      }
  
      try {
        const { data } = jwt.verify(token, secret);
        req.user = data;
      } catch {
        console.log('Invalid token');
      }
  
      return req;
    },
    signToken: function ({ email, username, _id }) {
      const payload = { email, username, _id };
  
      return jwt.sign({ data: payload }, secret);
    },
  };
  