'use client'
import { useState } from 'react'
import CreateApplicationDialog from './CreateApplicationDialog'

export default function CreateApplicationButton() {
    const [dialogVisible, setDialogVisible] = useState(false)
    return (
        <>
            {dialogVisible && (
                <CreateApplicationDialog
                    handleClose={() => setDialogVisible(false)}
                />
            )}
            <button
                className="create-application-button"
                onClick={() => setDialogVisible(true)}
            >
                Create Application
            </button>
        </>
    )
}
