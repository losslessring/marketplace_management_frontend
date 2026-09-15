import { AdjacencyList } from '@/app/interfaces/graph/AdjacencyList'
import { Visited } from '@/app/interfaces/graph/Visited'

export async function dfsRecursive(
    startNode: number,
    adjacencyList: AdjacencyList,
    prevNodeResult: any = undefined,
    callback: Function = (node: number, prevNodeResult: any = undefined) => {},
    visited: Visited = {},
    trace: number[] = []
) {
    visited[startNode] = true
    trace.push(startNode)
    const actualNodeResult = await callback(startNode, prevNodeResult)
    // console.log(prevNodeResult)

    if (adjacencyList[startNode].length === 0) {
        return trace
    }
    for (const child of adjacencyList[startNode]) {
        if (!visited[child]) {
            dfsRecursive(
                child,
                adjacencyList,
                actualNodeResult,
                callback,
                visited,
                trace
            )
        }
    }

    return trace
}
