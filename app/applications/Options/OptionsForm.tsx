'use client'

import { useState } from 'react'

export default function OptionsForm({ handleClose }: any) {
    const [globalBackgroundColor, setGlobalBackgroundColor] =
        useState<string>('#000000')

    return (
        <form className="flex flex-col gap-2 m-4">
            <div>
                <label>
                    Global background color
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
