'use server'

import { put } from '@/app/common/util/fetch'
import { CreateTreeNodesRequest } from '@/app/interfaces/CreateTreeNodesRequest.interface'

export default async function fullUpdateTreeNodesInDatabase(
    nodeData: CreateTreeNodesRequest
) {
    put('node-tree', nodeData)
}
