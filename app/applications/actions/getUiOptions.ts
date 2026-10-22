'use server'

import { get } from '@/app/common/util/fetch'
import { Style } from '@/app/interfaces/style/Style'

export default async function getUiOptions(): Promise<Style> {
    return get<Style>('ui-options')
}
