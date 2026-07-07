'use client'
import { ICoreNode } from '@/app/interfaces/coreNode.interface'
import { Connection } from '@/app/interfaces/dto/connection/Connection'
import { TreeNode } from '@/app/interfaces/TreeNode'
import { useNodeConnectionStore, useNodeStore } from '@/app/stores/node-store'
import { useEffect } from 'react'
import GraphEditor from './GraphEditor'
import NodeLibrary from './NodeLibrary'

export default function NodeEditor({
    coreNodes,
    applicationId,
    applicationNodesFromDatabase,
    connectionsFromDatabase,
}: {
    coreNodes: ICoreNode[]
    applicationId: number
    applicationNodesFromDatabase: TreeNode[]
    connectionsFromDatabase: Connection[]
}) {
    const { initStore, updateNodes } = useNodeStore()
    const { updateConnectionStore, resetConnectionStore } =
        useNodeConnectionStore()

    useEffect(() => {
        if (connectionsFromDatabase.length === 0) {
            resetConnectionStore()
        } else {
            resetConnectionStore()
            updateConnectionStore(connectionsFromDatabase)
        }
        // console.log(
        //     'Connections from database: ',
        //     useNodeConnectionStore.getState().connections
        // )
    }, [])

    useEffect(() => {
        if (applicationNodesFromDatabase.length === 0) {
            initStore()
        } else {
            initStore()
            updateNodes(applicationNodesFromDatabase)
        }
    }, [])

    return (
        <div className="grid grid-cols-1 grid-rows-[1fr_6fr] md:grid-rows-[1fr] md:grid-cols-[1fr_6fr] h-[84vh]">
            <NodeLibrary
                coreNodes={coreNodes}
                applicationId={applicationId}
            ></NodeLibrary>
            <GraphEditor applicationId={applicationId}></GraphEditor>
        </div>
    )
}
