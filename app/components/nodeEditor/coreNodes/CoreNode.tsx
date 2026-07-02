'use client'
import useDrag from '@/app/components/nodeEditor/coreNodes/hooks/useDrag'
import {
    useConnectingNodePairStore,
    useNodeStore,
    useSelectedNodeStore,
} from '@/app/stores/node-store'
import { useState } from 'react'
import useCreateConnection from './hooks/useCreateConnection'
import useSetInitialElementPosition from './hooks/useSetInitialElementPosition'
import InputConnection from './InputConnection'

export default function CoreNode({
    id,
    name,
}: React.PropsWithChildren<{
    id: number
    name: string
    applicationId: number
    className?: string
}>) {
    const { updateNodePosition } = useNodeStore()
    const { addId, removeId } = useSelectedNodeStore()

    const { addFirstId, addSecondId } = useConnectingNodePairStore()

    const [isDragging, setIsDragging] = useState<boolean>(false)
    useSetInitialElementPosition(id, Array.from(useNodeStore.getState().nodes))

    useDrag(id, updateNodePosition, setIsDragging)

    useCreateConnection()

    const interactionHandler = () => {
        if (isDragging) {
            return
        }

        if (useSelectedNodeStore.getState().ids.has(id)) {
            removeId(id)
        } else {
            addId(id)
        }

        if (useConnectingNodePairStore.getState().ids.size === 0) {
            addFirstId(id)
        }
        if (useConnectingNodePairStore.getState().ids.size === 1) {
            addSecondId(id)
        }
    }

    return (
        <div id={String(id)} className="draggable">
            <div
                className={`drag-handle basic-node rounded-full grid place-items-center ${
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
