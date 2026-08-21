'use server'

import { put } from '@/app/common/util/fetch'

export default async function saveNodeData(applicationId: number, data: any) {
    return put(`node-data/${applicationId}`, data)
}
