'use client'

import fullUpdateTreeNodesInDatabase from '@/app/applications/actions/fullUpdateTreeNodesInDatabase'
import { useNodeStore } from '@/app/stores/node-store'

function SaveGraphButton({
    className,
    applicationId,
}: React.PropsWithChildren<{
    className?: string
    applicationId: number
}>) {
    const {} = useNodeStore()

    return (
        <button
            className={className}
            onClick={() => {
                const nodes = useNodeStore.getState().nodes
                if (nodes) {
                    fullUpdateTreeNodesInDatabase({
                        nodes,
                        applicationId,
                    })
                }
            }}
        >
            Save Graph
        </button>
    )
}

export default SaveGraphButton
