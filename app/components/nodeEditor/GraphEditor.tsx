'use client'
import { ICoreNode } from '@/app/applications/interfaces/coreNode.interface'
import CoreNode from './coreNodes/CoreNode'

export default function GraphEditor({
    existingNodes,
    changeNodePositionHandler,
}: {
    existingNodes: ICoreNode[]
    changeNodePositionHandler: Function
}) {
    return (
        <div className="bg-blue-500 relative">
            {existingNodes.map((node, index) => (
                <div key={index}>
                    <CoreNode
                        id={String(node.id)}
                        name={node.name}
                        className="draggable basic-node"
                        changeNodePositionHandler={changeNodePositionHandler}
                    />
                </div>
            ))}
        </div>
    )
}
