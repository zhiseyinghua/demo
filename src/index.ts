import { switchMap, map } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { DbService } from './dbServer.service';
import { ToolService } from './toolService.service';
var getRawBody = require('raw-body');
const random = require('random')

// app.all('*', (req, res) => {
//   console.log('qwe')
//   res.send('Hello serverless with TypeScript & Express5!');
// });




module.exports.handler = function (req, res, context) {

  var checMailNumber = random.int(10000,99999)
  var url = req.url
  var path = req.path

  getRawBody(req, function (err, data) {
    console.log(data);
    let jsstr = JSON.stringify(data);
    let jsondata = JSON.parse(jsstr);
    let buf = new Buffer(jsondata);
    let buffdata = buf.toString();
    var body = JSON.parse(buffdata);
    switch (path) {

      /**
       * 判断用户是否存在，如果是则发送验证码
       */
      case '/check_email':
        let check = body as { email: string }
        return DbService.addStoreUser(check.email).pipe(
          map(
            (data) => {
              console.log(data && check.email);
              if (data && data.email) {
                console.log('User_already_exists');
                throw ('User_already_exists')
              } else {
                console.log('You_can_register');
                return 'You_can_register'
              }
            }),
          switchMap((data) => {
            return ToolService.SendEmail(check.email,checMailNumber)
          })
        ).subscribe(
          (data) => {
            // makeCallBack(callback, 200, null, data);
            res.send(JSON.stringify({ 'state': '200', 'message': 'success' }));
          },
          (error) => {
            console.log('error', error['Error'])
            console.log('error', error, typeof error)
            res.send(JSON.stringify({ 'state': '400', 'message': error }));
            // makeCallBack(callback, 400, error);
          }
        )
        break;

      default:
        break;
    }

  })


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
