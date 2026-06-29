'use client'
import { intersect } from '@/app/common/geometry/intersect'
import { useNodeStore, useSelectedNodeStore } from '@/app/stores/node-store'
import { useState } from 'react'
import CoreNode from './coreNodes/CoreNode'

export default function GraphEditor({
    applicationId,
}: {
    applicationId: number
}) {
    const {} = useNodeStore()
    const { addId, removeId } = useSelectedNodeStore()
    console.log('node store', useNodeStore.getState().nodes)

    const [startX, setStartX] = useState<number | null>(null)
    const [startY, setStartY] = useState<number | null>(null)
    const [endX, setEndX] = useState<number | null>(null)
    const [endY, setEndY] = useState<number | null>(null)
    const [isDragging, setIsDragging] = useState<boolean>(false)

    const dragHandler = (e: any) => {
        setEndX(e.nativeEvent.offsetX)
        setEndY(e.nativeEvent.offsetY)
        console.log('end x: ' + e.nativeEvent.offsetX)
        console.log('end y: ' + e.nativeEvent.offsetY)

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
                console.log(selectionFrame)
                console.log(nodeCoordinates)
                console.log('is intersected', isIntersected)
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
            className="bg-blue-500 relative"
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
            {startX && startY && endX && endY ? (
                <div
                    id="frame_area"
                    style={{
                        left: startX,
                        top: startY,
                        width: endX - startX,
                        height: endY - startY,
                    }}
                ></div>
            ) : (
                ''
            )}
            {useNodeStore.getState().nodes.map((node, index) => (
                <div key={index}>
                    <CoreNode
                        id={node.nodeId}
                        applicationId={applicationId}
                        name={'Core'}
                        //className="draggable basic-node"
                        className="drag-handle basic-node"
                    />
                </div>
            ))}
        </div>
    )
}
