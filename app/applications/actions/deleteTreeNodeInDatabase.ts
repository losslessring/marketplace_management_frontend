'use server'
import { fetchRequest } from '@/app/common/util/fetch'

export default async function deleteTreeNodeInDatabase(
    applicationId: number,
    ids: number[]
) {
    return await fetchRequest(`node-tree`, 'DELETE', {
        applicationId,
        ids,
    })
}
