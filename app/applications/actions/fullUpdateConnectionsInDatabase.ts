'use server'

import { put } from '@/app/common/util/fetch'
import { ApplicationConnections } from '@/app/interfaces/dto/connection/ApplicationConnections'

export default async function fullUpdateConnectionsInDatabase(
    applicationConnections: ApplicationConnections
) {
    put('connections', applicationConnections)
}
