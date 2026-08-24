'use client'
import { intersect } from '@/app/common/geometry/intersect'
import {
    useConnectingNodePairStore,
    useNodeConnectionStore,
    useNodeStore,
    useSelectedNodeStore,
} from '@/app/stores/node-store'
import { useRef, useState } from 'react'
import Connection from './Connection'
import CoreNode from './coreNodes/CoreNode'

export default function GraphEditor({
    applicationId,
}: {
    applicationId: number
}) {
    const {} = useNodeStore()
    const { addId, removeId } = useSelectedNodeStore()
    const {} = useConnectingNodePairStore()
    const { addConnection } = useNodeConnectionStore()
    // console.log('node store', useNodeStore.getState().nodes)

    const [startX, setStartX] = useState<number | null>(null)
    const [startY, setStartY] = useState<number | null>(null)
    const [endX, setEndX] = useState<number | null>(null)
    const [endY, setEndY] = useState<number | null>(null)
    const [isDragging, setIsDragging] = useState<boolean>(false)

    const [connectionOffsetX, setConnectionOffsetX] = useState<number>(30)
    const [connectionOffsetY, setConnectionOffsetY] = useState<number>(30)
    const nodeSize = Math.sqrt(
        Math.pow(connectionOffsetY, 2) + Math.pow(connectionOffsetX, 2)
    )

    const nodeUnderCursor = useRef(undefined)

    const nodes = Array.from(useNodeStore.getState().nodes)

    const connectionsWithCoordinates = Array.from(
        useNodeConnectionStore.getState().connections
    ).map((connection) => {
        const fromNode = nodes.find((node) => node.nodeId === connection.fromId)

        const toNode = nodes.find((node) => node.nodeId === connection.toId)

        if (fromNode && toNode) {
            return {
                id: `${fromNode.nodeId}_${toNode.nodeId}`,
                beginX: fromNode.positionX,
                beginY: fromNode.positionY,
                endX: toNode.positionX,
                endY: toNode.positionY,
            }
        }
    })

    // console.log('connections: ', connections)
    const dragHandler = (e: any) => {
        if (!nodeUnderCursor.current) {
            nodeUnderCursor.current = e.nativeEvent.target.getAttribute('id')
        }

        if (
            nodeUnderCursor.current !== e.nativeEvent.target.getAttribute('id')
        ) {
            console.log(
                'node under cursor: ',
                e.nativeEvent.target.getAttribute('id')
            )
            console.log('state end x: ', endX)
            console.log('state end y: ', endY)
            // setEndX(endX + e.nativeEvent.offsetX)
            // setEndY(endY + e.nativeEvent.offsetY)
            return
        }

        setEndX(e.nativeEvent.offsetX)
        setEndY(e.nativeEvent.offsetY)
        console.log('state end x: ', endX)
        console.log('state end y: ', endY)
        console.log('end x: ' + e.nativeEvent.offsetX)
        console.log('end y: ' + e.nativeEvent.offsetY)
        console.log('ref for node under cursor: ', nodeUnderCursor.current)
        console.log(
            'node under cursor: ',
            e.nativeEvent.target.getAttribute('id')
        )

        useNodeStore.getState().nodes.forEach((node) => {
            if (startX && startY && endX && endY) {
                const selectionFrame = {
                    minX: startX,
                    maxX: endX,
                    minY: startY,
                    maxY: endY,
                }

                const nodeCoordinates = {
                    minX: node.positionX,
                    maxX: node.positionX,
                    minY: node.positionY,
                    maxY: node.positionY,
                }
                const isIntersected = intersect(selectionFrame, nodeCoordinates)

                if (isIntersected) {
                    addId(node.nodeId)
                } else {
                    removeId(node.nodeId)
                }
            }
        })
    }

    return (
        <div
            className="graph-editor bg-blue-500 relative"
            id="graph_editor"
            onMouseDown={(e) => {
                setStartX(e.nativeEvent.offsetX)
                setStartY(e.nativeEvent.offsetY)
                console.log('start x: ' + e.nativeEvent.offsetX)
                console.log('start y: ' + e.nativeEvent.offsetY)
                setIsDragging(true)
            }}
            onMouseUp={(e) => {
                setIsDragging(false)

                setStartX(null)
                setStartY(null)
                setEndX(null)
                setEndY(null)
            }}
            onMouseMove={isDragging ? dragHandler : undefined}
        >
            {startX &&
            startY &&
            endX &&
            endY &&
            startX < endX &&
            startY < endY ? (
                <div
                    className="frame-area"
                    style={{
                        left: startX,
                        top: startY,
                        width: endX - startX,
                        height: endY - startY,
                        pointerEvents: 'none',
                    }}
                ></div>
            ) : startX &&
              startY &&
              endX &&
              endY &&
              startX > endX &&
              startY > endY ? (
                <div
                    className="frame-area"
                    style={{
                        left: endX,
                        top: endY,
                        width: startX - endX,
                        height: startY - endY,
                        pointerEvents: 'none',
                    }}
                ></div>
            ) : (
                ''
            )}
            {useNodeStore.getState().nodes.map((node, index) => (
                <div key={index}>
                    <CoreNode
                        id={node.nodeId}
                        name={'Core'}
                        pointerEvents={isDragging ? 'none' : 'auto'}
                    />
                </div>
            ))}
            <svg
                id={`connection_container_${applicationId}`}
                className={'connection'}
            >
                {connectionsWithCoordinates.map((connection, index) => {
                    if (connection) {
                        return (
                            <Connection
                                key={connection.id}
                                id={connection.id}
                                beginX={connection.beginX + connectionOffsetX}
                                beginY={connection.beginY + connectionOffsetY}
                                endX={connection.endX + connectionOffsetX}
                                endY={connection.endY + connectionOffsetY}
                                arrowShift={nodeSize - 7}
                                beginShift={nodeSize - 15}
                            ></Connection>
                        )
                    }
                })}
            </svg>
        </div>
    )
}
