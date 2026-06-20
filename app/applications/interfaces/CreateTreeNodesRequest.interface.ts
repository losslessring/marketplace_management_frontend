interface CreateTreeNode {
    positionX: number

    positionY: number

    nodeId: number
}

export interface CreateTreeNodesRequest {
    nodes: CreateTreeNode[]

    applicationId: number
}
