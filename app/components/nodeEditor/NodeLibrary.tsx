import { ICoreNode } from '@/app/interfaces/coreNode.interface'
import { useApplicationsNodeStore } from '@/app/stores/node-store'

export default function NodeLibrary({
    coreNodes,
    applicationId,
}: {
    coreNodes: ICoreNode[]
    applicationId: number
}) {
    const { applicationsNodes, addNodeToApplication } =
        useApplicationsNodeStore()
    return (
        <div className="bg-pink-300">
            <div>Node Library</div>
            {coreNodes.map((coreNode, index) => {
                const currentNodeId = index + 1
                return (
                    <div key={index}>
                        <div id={'node-library-' + currentNodeId}>
                            {coreNode.name}
                        </div>
                        <button
                            onClick={() => {
                                addNodeToApplication(applicationId)
                                console.log(applicationsNodes)

                                console.log('created node')
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
