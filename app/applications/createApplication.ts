'use server'

import { post } from '@/app/common/util/fetch'

export default async function createApplication(
    _prevState: any,
    formData: FormData
) {
    const { error } = await post('applications', formData)
    if (error) {
        return { error }
    }
    return
}
