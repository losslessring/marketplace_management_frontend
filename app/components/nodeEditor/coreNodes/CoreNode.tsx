'use client'
import useDrag from '@/app/components/nodeEditor/coreNodes/hooks/useDrag'
import { useNodeStore } from '@/app/stores/node-store'
import { useEffect } from 'react'

export default function CoreNode({
    id,
    name,
    changeNodePositionHandler,
    className,
}: React.PropsWithChildren<{
    id: string
    name: string
    changeNodePositionHandler: Function
    className?: string
}>) {
    // const [position, setPosition] = useState({ positionX: 600, positionY: 400 })
    const { existingNodes, updateExistingNodePosition } = useNodeStore()

    useDrag(id, changeNodePositionHandler, updateExistingNodePosition)
    //useEffect(() => console.log({ ...position, id }), [position])
    useEffect(() => console.log('existing nodes store', existingNodes))

    // changeNodePositionHandler((existingNodes: ICoreNode[]) =>
    //     existingNodes.map((existingNode: ICoreNode) => {
    //         return existingNode.id === Number(id)
    //             ? {
    //                   ...existingNode,
    //                   positionX: position.positionX,
    //                   positionY: position.positionY,
    //               }
    //             : existingNode
    //     })
    // )
    return (
        <div id={id} className={className}>
            {name}
        </div>
    )
}
