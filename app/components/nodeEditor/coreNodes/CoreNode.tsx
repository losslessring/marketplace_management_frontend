'use client'
import useDrag from '@/app/components/nodeEditor/coreNodes/hooks/useDrag'
import { useNodeStore, useSelectedNodeStore } from '@/app/stores/node-store'
import { useState } from 'react'
import useSetInitialElementPosition from './hooks/useUpdateElementPosition'
import InputConnection from './InputConnection'

export default function CoreNode({
    id,
    applicationId,
    name,
    className,
}: React.PropsWithChildren<{
    id: number
    name: string
    applicationId: number
    className?: string
}>) {
    const { nodes, updateNodePosition } = useNodeStore()
    const { addId, removeId } = useSelectedNodeStore()

    const [isDragging, setIsDragging] = useState<boolean>(false)
    useSetInitialElementPosition(id, nodes)

    useDrag(id, updateNodePosition, setIsDragging)

    const interactionHandler = () => {
        if (isDragging) {
            return
        }

        if (useSelectedNodeStore.getState().ids.has(id)) {
            removeId(id)
        } else {
            addId(id)
        }
    }

    return (
        <div id={String(id)} className="draggable">
            <div
                className={`drag-handle basic-node ${
                    useSelectedNodeStore.getState().ids.has(id)
                        ? 'border-4 border-indigo-600'
                        : ''
                }`}
                onMouseUp={interactionHandler}
                onTouchEnd={interactionHandler}
            >
                {name}
            </div>
            <InputConnection></InputConnection>
        </div>
    )
}
