'use client'
import { ICoreNode } from '@/app/applications/interfaces/coreNode.interface'
import CoreNode from './coreNodes/CoreNode'

export default function GraphEditor({
    existingNodes,
}: {
    existingNodes: ICoreNode[]
}) {
    return (
        <div className="bg-blue-500 relative">
            {existingNodes.map((coreNode, index) => (
                <div key={index}>
                    <CoreNode
                        id={`${coreNode.name.toLowerCase()}-node-${Math.random()
                            .toString(36)
                            .slice(2)}`}
                        name={coreNode.name}
                        className="draggable basic-node"
                    />
                </div>
            ))}
        </div>
    )
}
