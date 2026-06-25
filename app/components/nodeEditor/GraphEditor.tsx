'use client'
import { useApplicationsNodeStore } from '@/app/stores/node-store'
import CoreNode from './coreNodes/CoreNode'

export default function GraphEditor({
    applicationId,
}: {
    applicationId: number
}) {
    const { applicationsNodes } = useApplicationsNodeStore()

    const existingNodes = applicationsNodes.find(
        (application) => application.applicationId === applicationId
    )
    console.log('existing nodes', existingNodes)
    return (
        <div className="bg-blue-500 relative">
            {existingNodes?.existingNodes.map((node, index) => (
                <div key={index}>
                    <CoreNode
                        id={String(node.id)}
                        applicationId={applicationId}
                        name={node.name}
                        //className="draggable basic-node"
                        className="drag-handle basic-node"
                    />
                </div>
            ))}
        </div>
    )
}
