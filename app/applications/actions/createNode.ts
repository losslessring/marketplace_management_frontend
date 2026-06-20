'use server'

import { postNode } from '@/app/common/util/fetch'
import { IExistingNode } from '../interfaces/existingNode.interface'

export default async function createNodeInDatabase(nodeData: IExistingNode) {
    postNode('node-tree', nodeData)
}
