
/**
 * query返回的数据类型
 */
export interface queryReturnData {
    took: number,
    timed_out: boolean,
    _shards: {
        total: number,
        successful: number,
        skipped: number,
        failed: number
    },
    hits: {
        total: {
            value: number,
            relation: string
        },
        max_score: number,
        hits: [
            {
                _index: string,
                _type: string,
                _id: number,
                _score: number,
                _source: any
            }

        ]
    }
}