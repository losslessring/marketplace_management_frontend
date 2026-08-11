'use server'

import { postData } from '@/app/common/util/fetch'

export default async function getNodesData(applicationId: number) {
    return postData(`node-data/${applicationId}`)
}
