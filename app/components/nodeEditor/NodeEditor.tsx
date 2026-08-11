'use client'

import { useSelectedNodeStore } from '@/app/stores/node-store'

export default function NodeEditor({
    applicationId,
}: // currentNodeId,
{
    applicationId: number
    // currentNodeId: number
}) {
    const {} = useSelectedNodeStore()
    const selectedNodes = Array.from(useSelectedNodeStore.getState().ids)
    const lastSelectedNodeId = selectedNodes[selectedNodes.length - 1]

    return (
        <div className="node-editor bg-amber-700">
            Node Data <br />
            id: {lastSelectedNodeId}
            <br />
            data:
        </div>
    )
}
