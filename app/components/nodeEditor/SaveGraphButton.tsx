'use client'

import createTreeNodesInDatabase from '@/app/applications/actions/createTreeNodesInDatabase'
import { useNodeStore } from '@/app/stores/node-store'

function SaveGraphButton({
    className,
    applicationId,
}: React.PropsWithChildren<{
    className?: string
    applicationId: number
}>) {
    const { existingNodes } = useNodeStore()

    return (
        <button
            className={className}
            onClick={() => {
                const nodesToDatabase = existingNodes.map((node) => ({
                    positionX: node.positionX,

                    positionY: node.positionY,

                    nodeId: node.id,
                }))

                console.log(applicationId)
                console.log(nodesToDatabase)

                createTreeNodesInDatabase({
                    nodes: nodesToDatabase,
                    applicationId,
                })
            }}
        >
            Save Graph
        </button>
    )
}

export default SaveGraphButton
