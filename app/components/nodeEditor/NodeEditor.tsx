'use client'
import { ICoreNode } from '@/app/interfaces/coreNode.interface'
import { TreeNode } from '@/app/interfaces/TreeNode'
import { useApplicationsNodeStore } from '@/app/stores/node-store'
import { useEffect } from 'react'
import GraphEditor from './GraphEditor'
import NodeLibrary from './NodeLibrary'

export default function NodeEditor({
    coreNodes,
    applicationId,
    applicationNodesFromDatabase,
}: {
    coreNodes: ICoreNode[]
    applicationId: number
    applicationNodesFromDatabase: TreeNode[]
}) {
    const { initApplication, addMultipleNodesToApplication } =
        useApplicationsNodeStore()

    useEffect(() => {
        console.log(
            'Applications nodes from database',
            applicationNodesFromDatabase
        )
        if (applicationNodesFromDatabase.length === 0) {
            initApplication(applicationId)
        } else {
            initApplication(applicationId)
            addMultipleNodesToApplication(
                applicationId,
                applicationNodesFromDatabase.map((node) => ({
                    positionX: node.positionX,
                    positionY: node.positionY,

                    nodeId: node.nodeId,
                }))
            )
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
