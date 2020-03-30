import { Observable, throwError, from } from 'rxjs';
// const { Client } = require('@elastic/elasticsearch')
import { Client } from '@elastic/elasticsearch'
import { Login, ES_CONFIG } from './config';
import { ToolService } from './toolService.service'
import { esAxios } from './login.interface'

console.log('DbService');
export class DbService {
    static readonly TAG = 'StoreUserService';
    

    /**
     * 根据邮箱查找一个用户
     * @param email 
     */
    static addStoreUser(email:string): Observable<any> {
        let dataEsAios: esAxios = {
            url: Login.IP_URL + ES_CONFIG.TYPE +'/'+ ES_CONFIG. _SERACH,
            body: {
                "query": {
                    "bool": {
                        "must": [
                            {
                                "match": {
                                    "email.keyword": "618779868511@qq.com"
                                }
                            }
                        ]
                    }
                }
            },
            axiosType: 'get'
        }
        return from(ToolService.ESHttp(dataEsAios));
    }
}