'use server'

import { get } from '@/app/common/util/fetch'
import { IApplication } from '../interfaces/application.interface'

export default async function getApplications() {
    // const { error } = await get('applications')
    // if (error) {
    //     return { error }
    // }
    // return

    return get<IApplication[]>('applications', ['applications'])
}
