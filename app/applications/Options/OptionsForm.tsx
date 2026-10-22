'use client'

import { setStyle } from '@/app/common/style/setStyle'
import { useEffect, useState } from 'react'

export default function OptionsForm({ handleClose }: any) {
    const [globalBackgroundColor, setGlobalBackgroundColor] =
        useState<string>('')
    const [globalFontColor, setGlobalFontColor] = useState<string>('')

    useEffect(() => {
        const storedStyle = JSON.parse(localStorage.getItem('style') ?? 'null')
        setGlobalBackgroundColor(storedStyle.globalBackgroundColor)
        setGlobalFontColor(storedStyle.globalFontColor)
    }, [])

    useEffect(() => {
        const style = { globalBackgroundColor, globalFontColor }
        if (globalBackgroundColor && globalFontColor) {
            localStorage.setItem('style', JSON.stringify(style))
        }

        const storedStyle = JSON.parse(localStorage.getItem('style') ?? 'null')

        setStyle(storedStyle)
    }, [globalBackgroundColor, globalFontColor])

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
                    onClick={() => handleClose()}
                >
                    Cancel
                </button>
                <button type="submit" className="dialog-btn-primary">
                    Save
                </button>
            </div>
        </form>
    )
}
