'use server'

import { postData } from '@/app/common/util/fetch'
import { Style } from '@/app/interfaces/style/Style'

export default async function createUiOptions(
    iuOptions: Style
): Promise<Style> {
    return postData('ui-options', iuOptions)
}
