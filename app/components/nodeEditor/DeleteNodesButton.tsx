'use client'

import { TreeNode } from '@/app/interfaces/TreeNode'
import {
    NodeConnection,
    useNodeConnectionStore,
    useNodeStore,
    useSelectedConnectionsStore,
    useSelectedNodeStore,
} from '@/app/stores/node-store'

const removeNodelessConnections = (
    unselectedNodes: TreeNode[],
    connections: NodeConnection[]
) => {
    return connections.filter((connection) => {
        return (
            unselectedNodes.find((node) => node.nodeId === connection.fromId) &&
            unselectedNodes.find((node) => node.nodeId === connection.toId)
        )
    })
}

function DeleteNodesButton({
    className,
}: React.PropsWithChildren<{
    className?: string
}>) {
    const { updateNodes } = useNodeStore()
    const { initStore } = useSelectedNodeStore()

    const { updateConnectionStore } = useNodeConnectionStore()

    const {} = useSelectedConnectionsStore()

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

                const actualConnections = removeNodelessConnections(
                    unselectedNodes,
                    connections
                )

                updateConnectionStore(actualConnections)

                const selectedConnections = Array.from(
                    useSelectedConnectionsStore.getState().ids
                )
                console.log('selected connections: ', selectedConnections)

                if (selectedConnections) {
                    const unselectedConnections = Array.from(
                        useNodeConnectionStore.getState().connections
                    )
                        .map((connection) => {
                            return {
                                id: `${connection.fromId}_${connection.toId}`,
                                fromId: connection.fromId,
                                toId: connection.toId,
                            }
                        })
                        .filter(
                            (connection) =>
                                !selectedConnections.includes(connection.id)
                        )
                        .map(({ fromId, toId }) => ({ fromId, toId }))

                    updateConnectionStore(unselectedConnections)

                    console.log(
                        'unselected connections: ',
                        unselectedConnections
                    )
                }
            }}
        >
            Delete selected
        </button>
    )
}

export default DeleteNodesButton
