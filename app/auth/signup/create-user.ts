'use server'

import { post } from '@/app/common/util/fetch'
import { FormError } from '@/app/interfaces/form-error.interface'
import { redirect } from 'next/navigation'

export default async function createUser(
    _prevState: FormError,
    formData: FormData
) {
    const { error } = await post('users', formData)
    if (error) {
        return { error }
    }
    redirect('/')
}
