'use client'

import fullUpdateTreeNodesInDatabase from '@/app/applications/actions/fullUpdateTreeNodesInDatabase'
import { useApplicationsNodeStore } from '@/app/stores/node-store'

function SaveGraphButton({
    className,
    applicationId,
}: React.PropsWithChildren<{
    className?: string
    applicationId: number
}>) {
    const { applicationsNodes } = useApplicationsNodeStore()

    return (
        <button
            className={className}
            onClick={() => {
                const nodesToDatabase = applicationsNodes
                    .find(
                        (application) =>
                            application.applicationId === applicationId
                    )
                    ?.existingNodes.map((node) => ({
                        positionX: node.positionX,

                        positionY: node.positionY,

                        nodeId: node.id,
                    }))

                if (nodesToDatabase) {
                    fullUpdateTreeNodesInDatabase({
                        nodes: nodesToDatabase,
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
