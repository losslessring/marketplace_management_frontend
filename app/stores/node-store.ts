import { create } from 'zustand'
import { ICoreNode } from '../applications/interfaces/coreNode.interface'

interface IApplicationNodes {
    applicationId: number | null
    existingNodes: ICoreNode[]
}

interface IApplicationsNodeStore {
    applicationsNodes: IApplicationNodes[]
    initApplication: (id: number) => void
    addNodeToApplication: (id: number) => void
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
                            { applicationId: id, existingNodes: [] },
                        ],
                    }
                } else {
                    return state
                }
            }),
        addNodeToApplication: (id) =>
            set((state) => ({
                applicationsNodes: state.applicationsNodes.map(
                    (applicationNodes) => {
                        return applicationNodes.applicationId === id
                            ? {
                                  ...applicationNodes,
                                  existingNodes: [
                                      ...applicationNodes.existingNodes,
                                      {
                                          id:
                                              applicationNodes.existingNodes
                                                  .length + 1,
                                          name: 'Core',
                                          positionX: 99,
                                          positionY: 99,
                                      },
                                  ],
                              }
                            : applicationNodes
                    }
                ),
            })),

        updateNodePosition: (
            applicationId: number,
            nodeId: number,
            positionX: number,
            positionY: number
        ) =>
            set((state) => ({
                applicationsNodes: state.applicationsNodes.map(
                    (applicationNodes) => {
                        return applicationNodes.applicationId === applicationId
                            ? {
                                  ...applicationNodes,
                                  existingNodes:
                                      applicationNodes.existingNodes.map(
                                          (existingNode: ICoreNode) => {
                                              return existingNode.id === nodeId
                                                  ? {
                                                        ...existingNode,
                                                        positionX,
                                                        positionY,
                                                    }
                                                  : existingNode
                                          }
                                      ),
                              }
                            : applicationNodes
                    }
                ),
            })),
    })
)

interface INodeStore {
    existingNodes: ICoreNode[]
    addNode: () => void
    updateExistingNodePosition: (
        id: number,
        positionX: number,
        positionY: number
    ) => void
}

export const useNodeStore = create<INodeStore>((set) => ({
    existingNodes: [],
    addNode: () =>
        set((state) => ({
            existingNodes: [
                ...state.existingNodes,
                {
                    id: state.existingNodes.length + 1,
                    name: 'Core',
                    positionX: 99,
                    positionY: 99,
                },
            ],
        })),
    updateExistingNodePosition: (
        id: number,
        positionX: number,
        positionY: number
    ) =>
        set((state: any) => ({
            existingNodes: state.existingNodes.map(
                (existingNode: ICoreNode) => {
                    return existingNode.id === id
                        ? {
                              ...existingNode,
                              positionX,
                              positionY,
                          }
                        : existingNode
                }
            ),
        })),
}))
