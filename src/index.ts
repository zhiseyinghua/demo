
import { Server } from '@webserverless/fc-express';
import express from 'express';
const bodyParser = require('body-parser')
console.log('welcome')
const app = express();
app.all('*', (req, res) => {
  console.log('qwe')
  res.send('Hello serverless with TypeScript & Express5!');
});

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const server = new Server(app);

// http trigger entry
module.exports.handler = (req, res, context) => {
  console.log('this');
  // server.httpProxy(req, res, context);
  res.send('Hello serverless with TypeScript & Express5!');
  console.log('this2');
  
};

// api gateway entry
// module.exports.handler = function(event, context, callback) {
//   server.proxy(event, context, callback);
// };
