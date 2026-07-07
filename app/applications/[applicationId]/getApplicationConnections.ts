'use server'

import { get } from '@/app/common/util/fetch'
import { Connection } from '@/app/interfaces/dto/connection/Connection'

export default async function getApplicationConnections(applicationId: number) {
    return get<Connection[]>(`connections/${applicationId}`)
}
