import createNodeInDatabase from '@/app/applications/actions/createNode'
import { ICoreNode } from '@/app/applications/interfaces/coreNode.interface'
import { useNodeStore } from '@/app/stores/node-store'

export default function NodeLibrary({
    coreNodes,
    existingNodes,
    applicationId,
}: // addNodeHandler,
{
    coreNodes: ICoreNode[]
    existingNodes: ICoreNode[]
    applicationId: number
    // addNodeHandler: (existingNodes: ICoreNode[]) => any
}) {
    const { addNode } = useNodeStore()
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

                                console.log('created node')
                                createNodeInDatabase({
                                    positionX: 99,
                                    positionY: 99,
                                    nodeId: currentNodeId,
                                    applicationId,
                                })
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
