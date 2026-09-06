import { Connection } from '@/app/interfaces/dto/connection/Connection'
import { AdjacencyList } from '@/app/interfaces/graph/AdjacencyList'

export function createAdjacencyList(
    nodeIds: number[],
    connections: Connection[]
): AdjacencyList {
    // const connections = [
    //     { fromId: 827707, toId: 612534 },
    //     { fromId: 612534, toId: 600305 },
    //     { fromId: 600305, toId: 145109 },
    //     { fromId: 827707, toId: 725860 },
    //     { fromId: 725860, toId: 34534 },
    //     { fromId: 827707, toId: 582608 },
    //     { fromId: 582608, toId: 776040 },
    //     { fromId: 34534, toId: 855500 },
    // ]

    // return {
    //     582608: [776040],
    //     725860: [34534],
    //     776040: [],
    //     612534: [600305],
    //     600305: [145109],
    //     145109: [],
    //     34534: [855500],
    //     827707: [612534, 725860, 582608],
    //     855500: [],
    // }
    return nodeIds.reduce((acc, currentId) => {
        return {
            ...acc,
            [currentId]: connections
                .filter((connection) => connection.fromId === currentId)
                .map((connection) => connection.toId),
        }
    }, {})
}
