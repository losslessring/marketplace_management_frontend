'use server'

import { get } from '@/app/common/util/fetch'
import { IApplication } from '../../interfaces/application.interface'

export default async function getApplications() {
    return get<IApplication[]>('applications', ['applications'])
}
