'use client'

import createTreeNodesInDatabase from '@/app/applications/actions/createTreeNodesInDatabase'
import { useApplicationsNodeStore } from '@/app/stores/node-store'

function SaveGraphButton({
    className,
    applicationId,
}: React.PropsWithChildren<{
    className?: string
    applicationId: number
}>) {
    //const { existingNodes } = useNodeStore()
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

                console.log(applicationId)
                console.log(nodesToDatabase)

                if (nodesToDatabase) {
                    createTreeNodesInDatabase({
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
