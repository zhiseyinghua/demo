import { Observable, throwError, from } from 'rxjs';
// const { Client } = require('@elastic/elasticsearch')
import { Client } from '@elastic/elasticsearch'
import { Login, ES_CONFIG } from './config';

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
            node: Login.iP_NODE,
            auth: {
                username: ES_CONFIG.USER_NAME,
                password: ES_CONFIG.PASSWORD
            }
        })
        console.log('addStoreUser StoreUserService');
        return from(
            client.get({
                index: 'user',
                type: ES_CONFIG.TYPE,
                id: '1'
            })
        )
    }

}