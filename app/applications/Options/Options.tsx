'use client'
import { useState } from 'react'
import OptionsDialog from './OptionsDialog'

function Options({}: React.PropsWithChildren<{}>) {
    const [dialogVisible, setDialogVisible] = useState(false)
    return (
        <>
            {dialogVisible && (
                <OptionsDialog handleClose={() => setDialogVisible(false)} />
            )}
            <button
                className="create-application-button"
                onClick={() => setDialogVisible(true)}
            >
                Options
            </button>
        </>
    )
}

export default Options
