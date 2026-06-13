'use server'

import { get } from '@/app/common/util/fetch'
import { ICoreNode } from '../interfaces/coreNode.interface'

export default async function getCoreNodes() {
    return get<ICoreNode[]>('core-nodes')
}
