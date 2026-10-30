'use client'
import { setStyle } from '@/app/common/style/setStyle'
import { Style } from '@/app/interfaces/style/Style'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import OptionsDialog from './OptionsDialog'

function Options({ uiOptions }: React.PropsWithChildren<{ uiOptions: Style }>) {
    const [dialogVisible, setDialogVisible] = useState(false)
    const router = useRouter()
    return (
        <>
            {dialogVisible && (
                <OptionsDialog
                    handleClose={() => {
                        router.refresh()
                        setStyle(uiOptions)
                        setDialogVisible(false)
                    }}
                    uiOptions={uiOptions}
                />
            )}
            <button
                className="application-control-button"
                onClick={() => setDialogVisible(true)}
            >
                Options
            </button>
        </>
    )
}

export default Options
