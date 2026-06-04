'use server'

import { post } from '@/app/common/util/fetch'
import { revalidateTag } from 'next/cache'

export default async function createApplication(
    _prevState: any,
    formData: FormData
) {
    const { error } = await post('applications', formData)
    if (error) {
        return { error }
    }
    revalidateTag('applications')
    return
}
