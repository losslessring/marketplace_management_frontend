'use client'

import { TreeNode } from '@/app/interfaces/TreeNode'
import { useNodeStore, useSelectedNodeStore } from '@/app/stores/node-store'

function DeleteNodesButton({
    className,
}: React.PropsWithChildren<{
    className?: string
}>) {
    const { updateNodes } = useNodeStore()
    const { initStore } = useSelectedNodeStore()

    return (
        <button
            className={className}
            onClick={() => {
                const selectedNodeIds: number[] = Array.from(
                    useSelectedNodeStore.getState().ids
                )

                const nodes: TreeNode[] = useNodeStore.getState().nodes

                const withoutSelectedNodes = nodes.filter((node: TreeNode) => {
                    return !selectedNodeIds.includes(node.nodeId)
                })

                console.log(withoutSelectedNodes)

                updateNodes(withoutSelectedNodes)
                initStore()
            }}
        >
            Delete selected
        </button>
    )
}

export default DeleteNodesButton
