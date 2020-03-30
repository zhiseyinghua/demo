import { Observable, throwError, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login, ES_CONFIG } from './config';
var rp = require('request-promise');
import { esAxios } from './login.interface';
import { queryReturnData } from './elasticData.interface';



console.log('DbService');
export class ToolService {
    static readonly TAG = 'StoreUserService';
    /**
     * 添加一条store user 的 记录。==================OK
     * @param newStoreUser  StoreUser
     * @param oprator CommonRecordKey
     */
    static ESHttp(dataEsAios: esAxios): Observable<any> {
        console.log('');
        var options = {
            method: dataEsAios.axiosType,
            uri: dataEsAios.url,
            // qs: {
            //     access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
            // },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true, // Automatically parses the JSON string in the response
            body: dataEsAios.body
        };
        console.log(this.TAG+'options',JSON.stringify(options));
        // return from(rp(options)).pipe(
        //     map((data)=>{
        //         let mewData  = data as queryReturnData
        //         if(mewData.hits.hits.length <= 1) {
        //             return  mewData.hits.hits[0]._source;
        //         } else {
        //             // TODO:返回要遍历
        //             return  mewData.hits.hits[0]._source;
        //         }
        //     })
        // );
        return of({
            "email": "618779868511@qq.com",
            "name": "黄文强",
            "address": "shandong",
            "age": 18,
            "interests": "youyong shufa changge tiaowu",
            "birthday": "2001-01-19"
        })
    }

}

