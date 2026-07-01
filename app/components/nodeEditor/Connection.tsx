import { Path } from '@/app/interfaces/geometry/Path'

export default function Connection({ id, beginX, beginY, endX, endY }: Path) {
    return (
        <svg id={`connection_container_${id}`} className={'connection'}>
            <line
                id={`connection_line_${id}`}
                x1={`${beginX}`}
                y1={`${beginY}`}
                x2={`${endX}`}
                y2={`${endY}`}
            />
        </svg>
    )
}
