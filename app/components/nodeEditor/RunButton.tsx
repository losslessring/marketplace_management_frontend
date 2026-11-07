'use client'

import { createAdjacencyList } from '@/app/common/graph/createAdjacencyList'
import { dfsRecursive } from '@/app/common/graph/dfsRecursive'
import { nodeParser } from '@/app/common/graph/nodeParser'
import {
    useNodeConnectionStore,
    useNodeDataStore,
    useNodeStore,
    useSelectedNodeStore,
} from '@/app/stores/node-store'

function RunButton({}: React.PropsWithChildren<{}>) {
    const {} = useNodeStore()
    const {} = useNodeConnectionStore()
    const {} = useSelectedNodeStore()
    const {} = useNodeDataStore()

    return (
        <button
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

                const nodeData: any = useNodeDataStore
                    .getState()
                    .nodeData.reduce((acc, cur) => {
                        return {
                            ...acc,
                            [cur.id]: { type: cur.type, data: cur.data },
                        }
                    }, {})

                const adjacencyList = createAdjacencyList(nodeIds, connections)

                const startNode = selectedNodes[0]
                    ? selectedNodes[0]
                    : nodeIds[0]

                if (startNode) {
                    dfsRecursive(
                        startNode,
                        adjacencyList,
                        undefined,
                        async (node: number, prevNodeResult: any) => {
                            const result = await nodeParser(
                                node,
                                prevNodeResult,
                                nodeData
                            )
                            //TODO: Render result here
                            console.log(result)
                            return result
                        }
                    )
                }
            }}
        >
            Run
        </button>
    )
}

export default RunButton
