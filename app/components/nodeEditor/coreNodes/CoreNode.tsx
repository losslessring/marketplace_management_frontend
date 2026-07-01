'use client'
import useDrag from '@/app/components/nodeEditor/coreNodes/hooks/useDrag'
import {
    useConnectingNodeStore,
    useNodeConnectionStore,
    useNodeStore,
    useSelectedNodeStore,
} from '@/app/stores/node-store'
import { useEffect, useState } from 'react'
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
    const { updateNodePosition } = useNodeStore()
    const { addId, removeId } = useSelectedNodeStore()

    const { addConnection } = useNodeConnectionStore()

    const { addFirstId, addSecondId, resetConnection } =
        useConnectingNodeStore()

    const [isDragging, setIsDragging] = useState<boolean>(false)
    useSetInitialElementPosition(id, Array.from(useNodeStore.getState().nodes))

    useDrag(id, updateNodePosition, setIsDragging)

    useEffect(() => {
        if (useConnectingNodeStore.getState().ids.size === 2) {
            addConnection({
                id: 0,
                fromId: Array.from(useConnectingNodeStore.getState().ids)[0],
                toId: Array.from(useConnectingNodeStore.getState().ids)[1],
            })
            console.log(
                'node connection store',
                useNodeConnectionStore.getState().connections
            )
            resetConnection()
        }
    })

    const interactionHandler = () => {
        if (isDragging) {
            return
        }

        if (useSelectedNodeStore.getState().ids.has(id)) {
            removeId(id)
        } else {
            addId(id)
        }

        // if (useConnectingNodeStore.getState().ids.size === 2) {
        //     addConnection({
        //         id: 0,
        //         fromId: Array.from(useConnectingNodeStore.getState().ids)[0],
        //         toId: Array.from(useConnectingNodeStore.getState().ids)[1],
        //     })
        //     console.log(
        //         'node connection store',
        //         useNodeConnectionStore.getState().connections
        //     )
        //     resetConnection()
        // }
        if (useConnectingNodeStore.getState().ids.size === 0) {
            addFirstId(id)
        }
        if (useConnectingNodeStore.getState().ids.size === 1) {
            addSecondId(id)
        }

        console.log(useConnectingNodeStore.getState().ids)
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
