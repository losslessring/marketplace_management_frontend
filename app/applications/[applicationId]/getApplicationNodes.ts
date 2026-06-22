'use server'

import { get } from '@/app/common/util/fetch'
import { GetApplicationNodesRequest } from '../interfaces/GetApplicationNodesRequest'

export default async function getApplicationNodes(applicationId: number) {
    return get<GetApplicationNodesRequest[]>(`node-tree/${applicationId}`)
}
