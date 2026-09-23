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

                const adjacencyList = createAdjacencyList(nodeIds, connections)

                const startNode = selectedNodes[0]
                    ? selectedNodes[0]
                    : nodeIds[0]

                if (startNode) {
                    dfsRecursive(
                        startNode,
                        adjacencyList,
                        undefined,
                        (node: number, prevNodeResult: any) => {
                            const currentNodeData = nodeData[node]
                            if (
                                currentNodeData &&
                                currentNodeData.type === 'code'
                            ) {
                                try {
                                    // const result = eval(
                                    //     `((prev) => {

                                    //         ${currentNodeData.data}
                                    //     })("${prevNodeResult}")`
                                    // )
                                    // console.log(result)

                                    const code = currentNodeData.data

                                    // const prev = prevNodeResult

                                    let wrappedCode = `(async (prevNodeResult) => { ${code} })('${prevNodeResult}');`

                                    const result = eval(wrappedCode)

                                    return result
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
