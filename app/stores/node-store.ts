import { create } from 'zustand'
import { TreeNode } from '../interfaces/TreeNode'

export interface IApplicationNodes {
    applicationId: number | null
    existingNodes: TreeNode[]
}

interface IApplicationsNodeStore {
    applicationsNodes: IApplicationNodes[]
    initApplication: (id: number) => void
    addNodeToApplication: (id: number) => void
    addMultipleNodesToApplication: (id: number, nodes: TreeNode[]) => void
    updateNodePosition: (
        applicationId: number,
        nodeId: number,
        positionX: number,
        positionY: number
    ) => void
}

export const useApplicationsNodeStore = create<IApplicationsNodeStore>(
    (set) => ({
        applicationsNodes: [],
        initApplication: (id) =>
            set((state) => {
                if (
                    !state.applicationsNodes.find(
                        (application) => application.applicationId === id
                    )
                ) {
                    return {
                        applicationsNodes: [
                            ...state.applicationsNodes,
                            { applicationId: id, existingNodes: [] },
                        ],
                    }
                } else {
                    return state
                }
            }),
        addNodeToApplication: (id) =>
            set((state) => ({
                applicationsNodes: state.applicationsNodes.map((nodes) => {
                    return nodes.applicationId === id
                        ? {
                              ...nodes,
                              existingNodes: [
                                  ...nodes.existingNodes,
                                  {
                                      nodeId: nodes.existingNodes.length + 1,
                                      positionX: 0,
                                      positionY: 0,
                                  },
                              ],
                          }
                        : nodes
                }),
            })),

        addMultipleNodesToApplication: (id, nodesToAdd) =>
            set((state) => ({
                applicationsNodes: state.applicationsNodes.map((nodes) => {
                    return nodes.applicationId === id
                        ? {
                              ...nodes,
                              existingNodes: [...nodesToAdd],
                          }
                        : nodes
                }),
            })),

        updateNodePosition: (
            applicationId: number,
            nodeId: number,
            positionX: number,
            positionY: number
        ) =>
            set((state) => ({
                applicationsNodes: state.applicationsNodes.map((nodes) => {
                    return nodes.applicationId === applicationId
                        ? {
                              ...nodes,
                              existingNodes: nodes.existingNodes.map(
                                  (existingNode: TreeNode) => {
                                      return existingNode.nodeId === nodeId
                                          ? {
                                                ...existingNode,
                                                positionX,
                                                positionY,
                                            }
                                          : existingNode
                                  }
                              ),
                          }
                        : nodes
                }),
            })),
    })
)

interface INodeStore {
    nodes: TreeNode[]
    initStore: () => void
    addNode: () => void
    updateNodes: (newNodes: TreeNode[]) => void
    updateNodePosition: (
        nodeId: number,
        positionX: number,
        positionY: number
    ) => void
}

export const useNodeStore = create<INodeStore>((set) => ({
    nodes: [],
    initStore: () =>
        set((state) => ({
            nodes: [],
        })),
    addNode: () =>
        set((state) => ({
            nodes: [
                ...state.nodes,
                {
                    nodeId: state.nodes.length + 1,
                    positionX: 0,
                    positionY: 0,
                },
            ],
        })),
    updateNodePosition: (
        nodeId: number,
        positionX: number,
        positionY: number
    ) =>
        set((state: any) => ({
            nodes: state.nodes.map((node: TreeNode) => {
                return node.nodeId === nodeId
                    ? {
                          nodeId,
                          positionX,
                          positionY,
                      }
                    : node
            }),
        })),
    updateNodes: (newNodes: TreeNode[]) =>
        set((state) => ({
            nodes: [...newNodes],
        })),
}))
