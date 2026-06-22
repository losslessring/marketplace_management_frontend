'use client'
import { ICoreNode } from '@/app/applications/interfaces/coreNode.interface'
import CoreNode from './coreNodes/CoreNode'

export default function GraphEditor({
    existingNodes,
    applicationId,
}: {
    existingNodes: ICoreNode[] | undefined
    applicationId: number
}) {
    return (
        <div className="bg-blue-500 relative">
            {existingNodes?.map((node, index) => (
                <div key={index}>
                    <CoreNode
                        id={String(node.id)}
                        applicationId={applicationId}
                        name={node.name}
                        className="draggable basic-node"
                    />
                </div>
            ))}
        </div>
    )
}
