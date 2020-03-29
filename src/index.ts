import { switchMap } from 'rxjs/operators';
import express from 'express';
import { throwError, of } from 'rxjs';
const bodyParser = require('body-parser')
import { Handler } from "express";
import { DbService } from './dbServer.service';

console.log('welcome')
// const app = express();
// app.all('*', (req, res) => {
//   console.log('qwe')
//   res.send('Hello serverless with TypeScript & Express5!');
// });



export const handler: Handler = (
  req: any,
  res: any,
  context: any,
) => {

  // switch (req..proxy) {
  return DbService.addStoreUser().subscribe(
    (data) => {
      // makeCallBack(callback, 200, null, data);
      console.log(data);
      res.send('Hello serverless with TypeScript & Express5!');
    },
    (error) => {
      console.log(error);
      // makeCallBack(callback, 400, error);
    }
  )
  // }
}

// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// const server = new Server(app);

// // http trigger entry
// module.exports.handler = (req, res, context) => {
//   console.log(req);
//   // server.httpProxy(req, res, context);
//   res.send('Hello serverless with TypeScript & Express5!');
//   console.log('this2');

// };

// api gateway entry
// module.exports.handler = function(event, context, callback) {
//   server.proxy(event, context, callback);
// };
