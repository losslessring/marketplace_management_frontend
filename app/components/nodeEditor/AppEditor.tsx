'use client'
import { ICoreNode } from '@/app/interfaces/coreNode.interface'
import { NodeData } from '@/app/interfaces/data/NodeData'
import { Connection } from '@/app/interfaces/dto/connection/Connection'
import { TreeNode } from '@/app/interfaces/TreeNode'
import {
    useNodeConnectionStore,
    useNodeDataStore,
    useNodeStore,
} from '@/app/stores/node-store'
import { useEffect } from 'react'
import GraphEditor from './GraphEditor'
import NodeEditor from './NodeEditor'
import NodeLibrary from './NodeLibrary'

export default function AppEditor({
    coreNodes,
    applicationId,
    applicationNodesFromDatabase,
    connectionsFromDatabase,
    nodeData,
}: {
    coreNodes: ICoreNode[]
    applicationId: number
    applicationNodesFromDatabase: TreeNode[]
    connectionsFromDatabase: Connection[]
    nodeData: NodeData[]
}) {
    const { initStore, updateNodes } = useNodeStore()
    const { updateConnectionStore, resetConnectionStore } =
        useNodeConnectionStore()

    const { initNodeDataStore } = useNodeDataStore()

    useEffect(() => {
        if (connectionsFromDatabase.length === 0) {
            resetConnectionStore()
        } else {
            resetConnectionStore()
            updateConnectionStore(connectionsFromDatabase)
        }
    }, [])

    useEffect(() => {
        if (applicationNodesFromDatabase.length === 0) {
            initStore()
        } else {
            initStore()
            updateNodes(applicationNodesFromDatabase)
        }
    }, [])

    useEffect(() => {
        initNodeDataStore(nodeData)
    }, [])

    return (
        // <div className="grid grid-cols-1 grid-rows-[1fr_6fr] md:grid-rows-[1fr] md:grid-cols-[1fr_6fr]">
        <div className="application-editor">
            <div>
                <NodeLibrary
                    coreNodes={coreNodes}
                    applicationId={applicationId}
                ></NodeLibrary>
                <NodeEditor applicationId={applicationId}></NodeEditor>
            </div>
            <GraphEditor applicationId={applicationId}></GraphEditor>
        </div>
    )
}
