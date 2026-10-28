'use server'

import { getData } from '@/app/common/util/fetch'
import { Style } from '@/app/interfaces/style/Style'

export default async function getUiOptions(): Promise<Style | any> {
    return await getData<Style>('ui-options')
}
