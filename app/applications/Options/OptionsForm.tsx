'use client'

import { setStyle } from '@/app/common/style/setStyle'
import { Style } from '@/app/interfaces/style/Style'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import patchUiOptions from '../actions/patchUiOptions'

export default function OptionsForm({
    handleClose,
    uiOptions,
}: {
    handleClose: () => void
    uiOptions: Style
}) {
    const [globalBackgroundColor, setGlobalBackgroundColor] = useState<string>(
        uiOptions.globalBackgroundColor
    )
    const [globalFontColor, setGlobalFontColor] = useState<string>(
        uiOptions.globalFontColor
    )

    const router = useRouter()

    useEffect(() => {
        const style = { globalBackgroundColor, globalFontColor }

        setStyle(style)
    }, [globalBackgroundColor, globalFontColor, uiOptions])

    return (
        <form className="flex flex-col gap-2 m-4">
            <div>
                <div>
                    <label>
                        UI background color
                        <input
                            type="color"
                            id="global_background_color_input"
                            value={globalBackgroundColor}
                            onChange={(e) =>
                                setGlobalBackgroundColor(e.target.value)
                            }
                        ></input>
                    </label>
                </div>
                <div>
                    <label>
                        UI font color
                        <input
                            type="color"
                            id="global_background_color_input"
                            value={globalFontColor}
                            onChange={(e) => setGlobalFontColor(e.target.value)}
                        ></input>
                    </label>
                </div>
            </div>
            <div className="flex justify-around">
                <button
                    type="button"
                    className="dialog-btn-primary"
                    onClick={() => {
                        router.refresh()
                        handleClose()
                    }}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="dialog-btn-primary"
                    onClick={async () => {
                        patchUiOptions({
                            globalBackgroundColor,
                            globalFontColor,
                        })

                        router.refresh()
                    }}
                >
                    Save
                </button>
            </div>
        </form>
    )
}
