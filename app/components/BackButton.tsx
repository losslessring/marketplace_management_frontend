'use client'
import { useRouter } from 'next/navigation'
import { useNodeStore } from '../stores/node-store'

function BackButton({
    className,
    children,
}: React.PropsWithChildren<{
    className?: string
}>) {
    const router = useRouter()
    const { initStore } = useNodeStore()
    return (
        <button
            className={className}
            onClick={() => {
                initStore()
                router.push('/')
                router.refresh()
            }}
        >
            {children}
        </button>
    )
}

export default BackButton
