'use client'
import useDrag from '@/app/hooks/useDrag'

export default function CoreNode({
    id,
    name,
    className,
}: React.PropsWithChildren<{
    id: string
    name: string
    className?: string
}>) {
    useDrag(id)
    return (
        <div id={id} className={className}>
            {name}
        </div>
    )
}
