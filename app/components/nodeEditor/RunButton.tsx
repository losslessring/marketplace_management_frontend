'use client'

import { createAdjacencyList } from '@/app/common/graph/createAdjacencyList'
import { dfsRecursive } from '@/app/common/graph/dfsRecursive'
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

                const nodeData: any = useNodeDataStore
                    .getState()
                    .nodeData.reduce((acc, cur) => {
                        return {
                            ...acc,
                            [cur.id]: { type: cur.type, data: cur.data },
                        }
                    }, {})

                // console.log(nodeData)
                // console.log(nodeIds)
                // console.log(connections)
                // console.log(selectedNodes)
                const adjacencyList = createAdjacencyList(nodeIds, connections)
                // console.log(adjacencyList)
                const startNode = selectedNodes[0]
                    ? selectedNodes[0]
                    : nodeIds[0]
                if (startNode) {
                    dfsRecursive(
                        startNode,
                        adjacencyList,
                        undefined,
                        (node: number, prevNodeResult: any) => {
                            // console.log(nodeData[node])
                            // const nodeElement = document.getElementById(`${node}`)
                            // if (nodeElement) {
                            //     nodeElement.style.color = 'red'
                            // }
                            // console.log(prevNodeResult)

                            const currentNodeData = nodeData[node]
                            if (
                                currentNodeData &&
                                currentNodeData.type === 'code'
                            ) {
                                try {
                                    return eval(
                                        `(async () => {
                                            const prevNodeResult = ${prevNodeResult}
                                            ${currentNodeData.data}
                                        })()`
                                    )
                                } catch (error) {
                                    console.log(error)
                                }
                            }
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
