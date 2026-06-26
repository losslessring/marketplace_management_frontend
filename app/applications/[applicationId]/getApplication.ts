import { get } from '@/app/common/util/fetch'
import { IApplication } from '../../interfaces/application.interface'

export default async function getApplication(applicationId: number) {
    return get<IApplication>(`applications/${applicationId}`)
}
