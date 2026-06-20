import { ICoreNode } from '@/app/applications/interfaces/coreNode.interface'
import { useApplicationsNodeStore, useNodeStore } from '@/app/stores/node-store'

export default function NodeLibrary({
    coreNodes,
    existingNodes,
    applicationId,
}: {
    coreNodes: ICoreNode[]
    existingNodes: ICoreNode[]
    applicationId: number
}) {
    const { addNode } = useNodeStore()
    const { applicationsNodes, addNodeToApplication } =
        useApplicationsNodeStore()
    return (
        <div className="bg-pink-300">
            <div>Node Library</div>
            {coreNodes.map((coreNode, index) => {
                const currentNodeId = existingNodes.length + 1
                return (
                    <div key={index}>
                        <div id={'node-library-' + currentNodeId}>
                            {coreNode.name}
                        </div>
                        <button
                            onClick={() => {
                                addNode()
                                addNodeToApplication(applicationId)
                                console.log(applicationsNodes)

                                console.log('created node')
                                // createNodeInDatabase({
                                //     positionX: 99,
                                //     positionY: 99,
                                //     id: currentNodeId,
                                //     applicationId,
                                // })
                            }}
                        >
                            Add Node
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
