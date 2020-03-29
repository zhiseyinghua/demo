import { Observable, throwError, from } from 'rxjs';
// const { Client } = require('@elastic/elasticsearch')
import { Client } from '@elastic/elasticsearch'

console.log('DbService');
export class DbService {
    static readonly TAG = 'StoreUserService';
    /**
     * 添加一条store user 的 记录。==================OK
     * @param newStoreUser  StoreUser
     * @param oprator CommonRecordKey
     */
    static addStoreUser(): Observable<any> {
        console.log('addStoreUser StoreUserService');
        const client = new Client({
            node: 'http://es-cn-mp91l4ghi000kekh0.public.elasticsearch.aliyuncs.com:9200',
            auth: {
                username: 'elastic',
                password: 'Young533162903'
            }
        })
        console.log('addStoreUser StoreUserService');
        return from(
            client.get({
                index: 'user',
                type: '_doc',
                id: '1'
            })
        )
    }

}