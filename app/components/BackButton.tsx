'use client'
import { useRouter } from 'next/navigation'
import { useNodeStore, useSelectedNodeStore } from '../stores/node-store'

function BackButton({ children }: React.PropsWithChildren<{}>) {
    const router = useRouter()
    const { initStore: resetNodeStore } = useNodeStore()
    const { initStore: resetSelectedNodesStore } = useSelectedNodeStore()

    return (
        <button
            className="application-control-button"
            onClick={() => {
                resetNodeStore()
                resetSelectedNodesStore()
                router.push('/')
                router.refresh()
            }}
        >
            {children}
        </button>
    )
}

export default BackButton
