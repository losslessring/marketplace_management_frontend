'use client'
import { useNodeStore } from '@/app/stores/node-store'
import CoreNode from './coreNodes/CoreNode'

export default function GraphEditor({
    applicationId,
}: {
    applicationId: number
}) {
    const { nodes } = useNodeStore()
    return (
        <div className="bg-blue-500 relative">
            {nodes.map((node, index) => (
                <div key={index}>
                    <CoreNode
                        id={String(node.nodeId)}
                        applicationId={applicationId}
                        name={'Core'}
                        //className="draggable basic-node"
                        className="drag-handle basic-node"
                    />
                </div>
            ))}
        </div>
    )
}
