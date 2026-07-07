'use client'

import { TreeNode } from '@/app/interfaces/TreeNode'
import {
    useNodeConnectionStore,
    useNodeStore,
    useSelectedNodeStore,
} from '@/app/stores/node-store'

function DeleteNodesButton({
    className,
}: React.PropsWithChildren<{
    className?: string
}>) {
    const { updateNodes } = useNodeStore()
    const { initStore } = useSelectedNodeStore()

    const { updateConnectionStore } = useNodeConnectionStore()

    return (
        <button
            className={className}
            onClick={() => {
                const selectedNodeIds: number[] = Array.from(
                    useSelectedNodeStore.getState().ids
                )

                const nodes: TreeNode[] = useNodeStore.getState().nodes

                const unselectedNodes = nodes.filter((node: TreeNode) => {
                    return !selectedNodeIds.includes(node.nodeId)
                })

                updateNodes(unselectedNodes)
                initStore()

                const connections = Array.from(
                    useNodeConnectionStore.getState().connections
                )
                const actualConnections = connections.filter((connection) => {
                    return (
                        unselectedNodes.find(
                            (node) => node.nodeId === connection.fromId
                        ) &&
                        unselectedNodes.find(
                            (node) => node.nodeId === connection.toId
                        )
                    )
                })
                updateConnectionStore(actualConnections)
            }}
        >
            Delete selected
        </button>
    )
}

export default DeleteNodesButton
