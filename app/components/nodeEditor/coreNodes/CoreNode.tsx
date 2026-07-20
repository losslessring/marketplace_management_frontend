'use client'
import createRules from '@/app/common/ruleEngine/createRules'
import rule from '@/app/common/ruleEngine/rule'
import useDrag from '@/app/components/nodeEditor/coreNodes/hooks/useDrag'
import {
    useConnectingNodePairStore,
    useNodeStore,
    useSelectedNodeStore,
} from '@/app/stores/node-store'
import { useState } from 'react'
import useCreateConnection from './hooks/useCreateConnection'

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

    const nodes = Array.from(useNodeStore.getState().nodes)

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

        const runRulesResult = createRules([
            rule(
                (size) => size === 0,
                (_) => addFirstId(id)
            ),
            rule(
                (size) => size === 1,
                (_) => addSecondId(id)
            ),
        ]).run(useConnectingNodePairStore.getState().ids.size)

        // console.log('run rules result', runRulesResult)

        // if (useConnectingNodePairStore.getState().ids.size === 0) {
        //     addFirstId(id)
        // }
        // if (useConnectingNodePairStore.getState().ids.size === 1) {
        //     addSecondId(id)
        // }
    }
    const nodePosition = nodes.find((node) => node.nodeId === id)

    // console.log('node position x:', nodePosition?.positionX)
    // console.log('node position y:', nodePosition?.positionY)
    return (
        <div
            id={String(id)}
            className="draggable"
            style={{
                top: nodePosition?.positionY + 'px',
                left: nodePosition?.positionX + 'px',
            }}
        >
            <div
                id={String(id) + '_drag_handle'}
                className={`drag-handle basic-node  rounded-full grid place-items-center ${
                    useSelectedNodeStore.getState().ids.has(id)
                        ? 'selected-node'
                        : 'unselected-node'
                }`}
                onMouseUp={interactionHandler}
                onTouchEnd={interactionHandler}
            >
                {name}
            </div>
            {/* <InputConnection></InputConnection> */}
        </div>
    )
}
