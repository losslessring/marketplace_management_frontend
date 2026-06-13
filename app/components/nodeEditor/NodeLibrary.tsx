import { ICoreNode } from '@/app/applications/interfaces/coreNode.interface'
import CoreNode from './coreNodes/CoreNode'

export default function NodeLibrary({
    coreNodes,
    existingNodes,
    addNodeHandler,
}: {
    coreNodes: ICoreNode[]
    existingNodes: ICoreNode[]
    addNodeHandler: (existingNodes: ICoreNode[]) => any
}) {
    return (
        <div className="bg-pink-300">
            <div>Node Library</div>
            {coreNodes.map((coreNode) => (
                <div key={coreNode.id}>
                    <CoreNode
                        id={String(coreNode.id)}
                        name={coreNode.name}
                        className="library-core-node"
                    />
                    <button
                        onClick={() =>
                            addNodeHandler([
                                ...existingNodes,
                                { id: coreNode.id, name: coreNode.name },
                            ])
                        }
                    >
                        Add Node
                    </button>
                </div>
            ))}
        </div>
    )
}
