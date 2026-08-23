'use server'

import { postNode } from '@/app/common/util/fetch'
import { CreateTreeNodesRequest } from '@/app/interfaces/CreateTreeNodesRequest.interface'

export default async function createTreeNodesInDatabase(
    nodeData: CreateTreeNodesRequest
) {
    postNode('node-tree', nodeData)
}
