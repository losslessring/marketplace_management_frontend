'use server'

import { postNode } from '@/app/common/util/fetch'
import { IExistingNode } from '../interfaces/existingNode.interface'

export default async function createNode(nodeData: IExistingNode) {
    postNode('node-tree', nodeData)
}
