import { Path } from '@/app/interfaces/geometry/Path'
import { useEffect, useState } from 'react'

export default function Connection({ id, beginX, beginY, endX, endY }: Path) {
    const defaultLineStyle = 'stroke-sky-200 stroke-[2]'
    const selectedLineStyle = 'stroke-yellow-50 stroke-[10]'
    const hiddenInteractionLineStyle = 'stroke-sky-200 stroke-[10] opacity-0'

    const [lineStyle, setLineStyle] = useState<string>(defaultLineStyle)
    const [isSelected, setIsSelected] = useState<boolean>(false)

    useEffect(() => {
        if (isSelected) {
            setLineStyle(selectedLineStyle)
        } else {
            setLineStyle(defaultLineStyle)
        }
    }, [isSelected])

    return (
        <g>
            <line
                id={`connection_line_${id}`}
                x1={`${beginX}`}
                y1={`${beginY}`}
                x2={`${endX}`}
                y2={`${endY}`}
                className={lineStyle}
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
                }}
                className={hiddenInteractionLineStyle}
            />
        </g>
    )
}
