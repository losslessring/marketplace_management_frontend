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
            {/* <Basic id="basic-node-0" className="basic-node"></Basic>
            <Url id="url-node-0" className="url-node"></Url>
            <Hub id="hub-node-0" className="hub-node"></Hub> */}
            {existingNodes.map((coreNode, index) => (
                <div key={index}>
                    <CoreNode
                        id={`${coreNode.name.toLowerCase()}-node-${Math.random()
                            .toString(36)
                            .slice(2)}`}
                        name={coreNode.name}
                        className="basic-node"
                    />
                </div>
            ))}
        </div>
    )
}
