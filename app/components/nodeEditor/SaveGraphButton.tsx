'use client'

import fullUpdateConnectionsInDatabase from '@/app/applications/actions/fullUpdateConnectionsInDatabase'
import fullUpdateTreeNodesInDatabase from '@/app/applications/actions/fullUpdateTreeNodesInDatabase'
import { useNodeConnectionStore, useNodeStore } from '@/app/stores/node-store'

function SaveGraphButton({
    className,
    applicationId,
}: React.PropsWithChildren<{
    className?: string
    applicationId: number
}>) {
    const {} = useNodeStore()
    const {} = useNodeConnectionStore()

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

                const connections =
                    useNodeConnectionStore.getState().connections

                if (connections) {
                    fullUpdateConnectionsInDatabase({
                        connections: Array.from(connections),
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
