'use client'
import useDrag from '@/app/components/nodeEditor/coreNodes/hooks/useDrag'
import { useApplicationsNodeStore } from '@/app/stores/node-store'
import { useEffect } from 'react'
import InputConnection from './InputConnection'

export default function CoreNode({
    id,
    applicationId,
    name,
    className,
}: React.PropsWithChildren<{
    id: string
    name: string
    applicationId: number
    className?: string
}>) {
    const { applicationsNodes, updateNodePosition } = useApplicationsNodeStore()

    useEffect(() => {
        const nodePosition = applicationsNodes
            .find((application) => application.applicationId === applicationId)
            ?.existingNodes.find((node) => node.nodeId === Number(id))

        const element = document.getElementById(id)

        if (element && nodePosition) {
            element.style.top = nodePosition?.positionY + 'px'
            element.style.left = nodePosition?.positionX + 'px'
        }
    }, [])

    useDrag(id, applicationId, updateNodePosition)
    // useEffect(() => console.log('existing nodes store', existingNodes))

    return (
        <div id={id} className="draggable">
            <div className="drag-handle basic-node">{name}</div>
            <InputConnection></InputConnection>
        </div>
    )
}
