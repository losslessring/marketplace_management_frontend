'use client'
import { useRouter } from 'next/navigation'

function BackButton({
    className,
    children,
}: React.PropsWithChildren<{
    className?: string
}>) {
    const router = useRouter()
    return (
        <button
            className={className}
            onClick={() => {
                router.push('/')
                router.refresh()
            }}
        >
            {children}
        </button>
    )
}

export default BackButton
