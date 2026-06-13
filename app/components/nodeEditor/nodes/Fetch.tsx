import useDrag from '@/app/hooks/useDrag'

export default function Fetch({
    id,
    className,
    children,
}: React.PropsWithChildren<{
    id: string
    className?: string
}>) {
    useDrag(id)
    return (
        <div id={id} className={className}>
            Fetch
        </div>
    )
}
