'use client'
import useDrag from '@/app/hooks/useDrag'

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

    useDrag(id, changeNodePositionHandler)
    // useEffect(() => console.log({ ...position, id }), [position])

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
