'use server'

import { patchData } from '@/app/common/util/fetch'
import { Style } from '@/app/interfaces/style/Style'

export default async function patchUiOptions(iuOptions: Style): Promise<any> {
    return await patchData('ui-options', iuOptions)
}
