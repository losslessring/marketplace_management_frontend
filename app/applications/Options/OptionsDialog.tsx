'use client'
import { Style } from '@/app/interfaces/style/Style'
import OptionsForm from './OptionsForm'

export default function OptionsDialog({
    handleClose,
    uiOptions,
}: {
    handleClose: () => void
    uiOptions: Style
}) {
    return (
        <div className="w-full h-full bg-transparent fixed flex justify-center items-center z-50 top-0 left-0">
            <div className="w-full max-w-xs flex flex-col gap-2 bg-gray-600 rounded-md">
                <div className="flex justify-center text-l mt-4">
                    <h1>Options</h1>
                </div>
                <div className="dialog-body">
                    <OptionsForm
                        handleClose={() => handleClose()}
                        uiOptions={uiOptions}
                    />
                    <button
                        className="create-application-button"
                        onClick={handleClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}
