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
    //const { applicationsNodes } = useApplicationsNodeStore()

    const { nodes } = useNodeStore()

    return (
        <button
            className={className}
            onClick={() => {
                console.log(nodes)
                // const nodesToDatabase = applicationsNodes
                //     .find(
                //         (application) =>
                //             application.applicationId === applicationId
                //     )
                //     ?.existingNodes.map((node) => ({
                //         positionX: node.positionX,

                //         positionY: node.positionY,

                //         nodeId: node.nodeId,
                //     }))
                // console.log(nodesToDatabase)

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
