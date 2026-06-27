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
    const { nodes } = useNodeStore()

    return (
        <button
            className={className}
            onClick={() => {
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
