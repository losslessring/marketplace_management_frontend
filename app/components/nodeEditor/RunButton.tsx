'use client'

import { createAdjacencyList } from '@/app/common/graph/createAdjacencyList'
import { dfsRecursive } from '@/app/common/graph/dfsRecursive'
import {
    useNodeConnectionStore,
    useNodeStore,
    useSelectedNodeStore,
} from '@/app/stores/node-store'

function RunButton({}: React.PropsWithChildren<{}>) {
    const {} = useNodeStore()
    const {} = useNodeConnectionStore()
    const {} = useSelectedNodeStore()

    return (
        <button
            className={'ml-4'}
            onClick={() => {
                const nodeIds = Array.from(useNodeStore.getState().nodes).map(
                    (node) => node.nodeId
                )
                const connections = Array.from(
                    useNodeConnectionStore.getState().connections
                )
                const selectedNodes = Array.from(
                    useSelectedNodeStore.getState().ids
                )

                console.log(nodeIds)
                console.log(connections)
                console.log(selectedNodes)
                const adjacencyList = createAdjacencyList(nodeIds, connections)
                console.log(adjacencyList)
                const startNode = selectedNodes[0]
                    ? selectedNodes[0]
                    : nodeIds[0]
                if (startNode) {
                    dfsRecursive(startNode, adjacencyList, (node: number) =>
                        console.log(node)
                    )
                }
            }}
        >
            Run
        </button>
    )
}

export default RunButton
