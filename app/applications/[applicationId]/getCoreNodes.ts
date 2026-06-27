'use server'

import { get } from '@/app/common/util/fetch'
import { ICoreNode } from '@/app/interfaces/coreNode.interface'

export default async function getCoreNodes() {
    return get<ICoreNode[]>('core-nodes')
}
