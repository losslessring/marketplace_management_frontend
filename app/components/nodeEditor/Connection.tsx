import { Path } from '@/app/interfaces/geometry/Path'
import { useSelectedConnectionsStore } from '@/app/stores/node-store'
import { useEffect, useState } from 'react'

export default function Connection({ id, beginX, beginY, endX, endY }: Path) {
    const defaultLineStyle = 'default-line'
    const selectedLineStyle = 'selected-line'
    const hiddenInteractionLineStyle = 'stroke-sky-200 stroke-[10] opacity-0'

    const { addConnectionId, removeConnectionId } =
        useSelectedConnectionsStore()

    const [lineStyle, setLineStyle] = useState<string>(defaultLineStyle)
    const [isSelected, setIsSelected] = useState<boolean>(false)

    const th = Math.atan2(endY - beginY, endX - beginX)
    const arrowPointDistance =
        Math.sqrt(Math.pow(endY - beginY, 2) + Math.pow(endX - beginX, 2)) / 2
    console.log('theta: ', th)
    console.log('arrow point distance: ', arrowPointDistance)
    const arrowPointX = beginX + arrowPointDistance * Math.cos(th)
    const arrowPointY = beginY + arrowPointDistance * Math.sin(th)

    useEffect(() => {
        console.log(useSelectedConnectionsStore.getState().ids)
        console.log(useSelectedConnectionsStore.getState().ids.has(id))
        if (isSelected) {
            setLineStyle(selectedLineStyle)
        } else {
            setLineStyle(defaultLineStyle)
        }
    }, [isSelected])

    return (
        <g>
            <defs>
                <marker
                    id="arrow"
                    markerWidth="10"
                    markerHeight="10"
                    refX="5"
                    refY="5"
                    orient="auto"
                >
                    <path
                        d="M 0 0 L 10 5 L 0 10 z"
                        fill="oklch(90.1% 0.058 230.902)"
                    />
                </marker>
            </defs>
            <line
                id={`connection_line_${id}`}
                x1={`${beginX}`}
                y1={`${beginY}`}
                x2={`${endX}`}
                y2={`${endY}`}
                className={lineStyle}
            />

            <line
                id={`connection_arrow_line_${id}`}
                x1={`${beginX}`}
                y1={`${beginY}`}
                x2={`${arrowPointX}`}
                y2={`${arrowPointY}`}
                className={'line-arrow'}
                markerEnd="url(#arrow)"
            />

            <line
                id={`hidden_interactive_connection_line_${id}`}
                x1={`${beginX}`}
                y1={`${beginY}`}
                x2={`${endX}`}
                y2={`${endY}`}
                onMouseOver={() => {
                    setLineStyle(selectedLineStyle)
                }}
                onMouseLeave={() => {
                    if (!isSelected) {
                        setLineStyle(defaultLineStyle)
                    }
                }}
                onClick={() => {
                    isSelected ? setIsSelected(false) : setIsSelected(true)
                    isSelected ? removeConnectionId(id) : addConnectionId(id)
                }}
                className={hiddenInteractionLineStyle}
            />
        </g>
    )
}
