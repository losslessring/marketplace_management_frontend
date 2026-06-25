'use server'

import { get } from '@/app/common/util/fetch'
import { TreeNode } from '../interfaces/TreeNode'

export default async function getApplicationNodes(applicationId: number) {
    return get<TreeNode[]>(`node-tree/${applicationId}`)
}
