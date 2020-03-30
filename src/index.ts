import { switchMap, map } from 'rxjs/operators';
import express, { json } from 'express';
import { throwError, of } from 'rxjs';
const bodyParser = require('body-parser')
import { Handler } from "express";
import { DbService } from './dbServer.service';

// app.all('*', (req, res) => {
//   console.log('qwe')
//   res.send('Hello serverless with TypeScript & Express5!');
// });



export const handler: Handler = (
  req: any,
  res: any,
  context: any,
) => {
  console.log('req.body',req.res._events)
  return DbService.addStoreUser('618779868511@qq.com').pipe(
    map(
      (data) => {
        console.log(data.email);
        if (data && data.email) {
          console.log('User_already_exists');
            throw ('User_already_exists') 
        } else {
          console.log('You_can_register');
          return 'You_can_register'
        }
      }),
  ).subscribe(
    (data) => {
      // makeCallBack(callback, 200, null, data);
      res.send(JSON.stringify({'state':'200','message':data}));
    },
    (error) => {
      console.log('error',error['Error'])
      console.log('error',error,typeof error)
      res.send(JSON.stringify({'state':'400','message':error}));
      // makeCallBack(callback, 400, error);
    }
  )
}

// switch (req.proxy) {

// }

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
