import { AdjacencyList } from '@/app/interfaces/graph/AdjacencyList'
import { Visited } from '@/app/interfaces/graph/Visited'

export async function dfsRecursive(
    startNode: number,
    adjacencyList: AdjacencyList,
    prevNodeResult: any = undefined,
    callback: Function = (node: number, prevNodeResult: any = undefined) => {},
    visited: Visited = {}
) {
    visited[startNode] = true

    const actualNodeResult = await callback(startNode, prevNodeResult)

    for (const child of adjacencyList[startNode]) {
        if (!visited[child]) {
            dfsRecursive(
                child,
                adjacencyList,
                actualNodeResult,
                callback,
                visited
            )
        }
    }
}
