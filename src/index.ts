import { switchMap, map } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { DbService } from './dbServer.service';
import { ToolService } from './toolService.service';
var getRawBody = require('raw-body');
const NodeRSA = require('node-rsa');
const crypto = require('crypto');
import edb64 from "en-decode-b64";




module.exports.handler = function (req, res, context) {
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
          // TODO:访问限制
          switchMap((data) => {
            return ToolService.SendEmail(check.email)
          })
        ).subscribe(
          (data) => {
            // makeCallBack(callback, 200, null, data);
            res.send(JSON.stringify({ 'state': '200', 'message': 'success' }));
          },
          (error) => {
            console.log('error', error['Error']);
            console.log('error', error, typeof error);
            res.send(JSON.stringify({ 'state': '400', 'message': error }));
            // makeCallBack(callback, 400, error);
          }
        )
        break;
      case '/greetings':
        console.log('start');
        signin(res)
        break;
      default:
        break;
    }

  })
}

function signin(res) {
  const key = new NodeRSA({ b: 2048 }); 
  //生成2048位的密钥
  var publicDer = key.exportKey('pkcs1-public-pem'); //公钥
  var privateDer = key.exportKey('pkcs1-private-pem');//私钥
  console.log('公钥:', publicDer);
  console.log('私钥:', privateDer);
  // 加密 start
  let base64key = {
    publicDer: publicDer,
    privateDer: privateDer
  }
  const encodedString = edb64.encode(base64key);
  console.log(base64key);
  res.send(JSON.stringify({ 'state': '200', 'message': 'success' }));
}