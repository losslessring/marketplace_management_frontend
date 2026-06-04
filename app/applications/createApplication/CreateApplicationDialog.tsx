import CreateApplicationForm from './CreateApplicationForm'

interface CreateApplicationDialogProps {
    handleClose: () => void
}

export default function CreateApplicationDialog({
    handleClose,
}: CreateApplicationDialogProps) {
    return (
        <div className="w-full h-full bg-gray-800 fixed flex justify-center items-center z-50 top-0 left-0">
            <div className="w-full max-w-xs flex flex-col gap-2 bg-gray-600 rounded-md">
                <div className="flex justify-center text-l mt-4">
                    <h1>Create Application</h1>
                </div>
                <div className="dialog-body">
                    <CreateApplicationForm handleClose={() => handleClose()} />
                </div>
            </div>
        </div>
    )
}
