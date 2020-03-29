// import { Observable, throwError, from } from 'rxjs';
// // const { Client } = require('@elastic/elasticsearch')
// import { Client } from '@elastic/elasticsearch'


// export class DbService {
//     static readonly TAG = 'StoreUserService';
//     /**
//      * 添加一条store user 的 记录。==================OK
//      * @param newStoreUser  StoreUser
//      * @param oprator CommonRecordKey
//      */
//     static addStoreUser(): Observable<any> {
//         const client = new Client({
//             cloud: {
//                 id: 'name:bG9jYWxob3N0JGFiY2QkZWZnaA==',
//             },
//             auth: {
//                 username: 'elastic',
//                 password: 'changeme'
//             }
//         })
//         return from(client.search({
//             index: 'my-index',
//             body: { foo: 'bar' }
//         }))
//     }

// }