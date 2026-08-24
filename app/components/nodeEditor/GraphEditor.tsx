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

    const [startX, setStartX] = useState<number>(0)
    const [startY, setStartY] = useState<number>(0)
    const [endX, setEndX] = useState<number>(0)
    const [endY, setEndY] = useState<number>(0)
    const [isDragging, setIsDragging] = useState<boolean>(false)

    const [connectionOffsetX, setConnectionOffsetX] = useState<number>(30)
    const [connectionOffsetY, setConnectionOffsetY] = useState<number>(30)
    const nodeSize = Math.sqrt(
        Math.pow(connectionOffsetY, 2) + Math.pow(connectionOffsetX, 2)
    )

    // const nodeUnderCursor = useRef(undefined)

    const dragRightDown = useRef(false)

    const dragLeftUp = useRef(false)

    const dragLeftDown = useRef(false)

    const dragRightUp = useRef(false)

    // const rightDownSelectionBox = {
    //     minX: startX,
    //     maxX: endX,
    //     minY: startY,
    //     maxY: endY,
    // }
    // const selectionFrameBox = useRef(rightDownSelectionBox)

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
        // if (!nodeUnderCursor.current) {
        //     nodeUnderCursor.current = e.nativeEvent.target.getAttribute('id')
        // }

        // if (
        //     nodeUnderCursor.current !== e.nativeEvent.target.getAttribute('id')
        // ) {
        //     console.log(
        //         'node under cursor: ',
        //         e.nativeEvent.target.getAttribute('id')
        //     )
        //     console.log('state end x: ', endX)
        //     console.log('state end y: ', endY)

        //     return
        // }

        setEndX(e.nativeEvent.offsetX)
        setEndY(e.nativeEvent.offsetY)
        console.log('state end x: ', endX)
        console.log('state end y: ', endY)
        console.log('end x: ' + e.nativeEvent.offsetX)
        console.log('end y: ' + e.nativeEvent.offsetY)
        // console.log('ref for node under cursor: ', nodeUnderCursor.current)
        // console.log(
        //     'node under cursor: ',
        //     e.nativeEvent.target.getAttribute('id')
        // )

        dragRightDown.current = startX < endX && startY < endY

        console.log('is dragging right down? ', dragRightDown.current)

        dragLeftUp.current = startX > endX && startY > endY

        console.log('is dragging left up? ', dragLeftUp.current)

        dragLeftDown.current = startX > endX && startY < endY

        console.log('is dragging left down? ', dragLeftDown.current)

        dragRightUp.current = startX < endX && startY > endY

        console.log('is dragging right up? ', dragRightUp.current)

        useNodeStore.getState().nodes.forEach((node) => {
            if (isDragging && startX && startY && endX && endY) {
                const selectionFrameBox = dragRightDown.current
                    ? {
                          minX: startX,
                          maxX: endX,
                          minY: startY,
                          maxY: endY,
                      }
                    : dragLeftUp.current
                    ? {
                          minX: endX,
                          maxX: startX,
                          minY: endY,
                          maxY: startY,
                      }
                    : dragLeftDown.current
                    ? {
                          minX: endX,
                          maxX: startX,
                          minY: startY,
                          maxY: endY,
                      }
                    : dragRightUp.current
                    ? {
                          minX: startX,
                          maxX: endX,
                          minY: endY,
                          maxY: startY,
                      }
                    : {
                          minX: 0,
                          maxX: 0,
                          minY: 0,
                          maxY: 0,
                      }

                const nodeCoordinates = {
                    minX: node.positionX,
                    maxX: node.positionX,
                    minY: node.positionY,
                    maxY: node.positionY,
                }
                console.log(selectionFrameBox)
                const isIntersected = intersect(
                    selectionFrameBox,
                    nodeCoordinates
                )

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
                setStartX(0)
                setStartY(0)
                setEndX(0)
                setEndY(0)
                setIsDragging(false)
                dragRightDown.current = false
                dragLeftUp.current = false
                dragLeftDown.current = false
                dragRightUp.current = false
            }}
            onMouseMove={isDragging ? dragHandler : undefined}
        >
            {isDragging && dragRightDown.current ? (
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
            ) : isDragging && dragLeftUp.current ? (
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
            ) : isDragging && dragLeftDown.current ? (
                <div
                    className="frame-area"
                    style={{
                        left: endX,
                        top: startY,
                        width: startX - endX,
                        height: endY - startY,
                        pointerEvents: 'none',
                    }}
                ></div>
            ) : isDragging && dragRightUp.current ? (
                <div
                    className="frame-area"
                    style={{
                        left: startX,
                        top: endY,
                        width: endX - startX,
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
