'use client'
import { ICoreNode } from '@/app/applications/interfaces/coreNode.interface'
import { GetApplicationNodesRequest } from '@/app/applications/interfaces/GetApplicationNodesRequest'
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
    applicationNodesFromDatabase: GetApplicationNodesRequest[]
}) {
    const {
        applicationsNodes,
        initApplication,
        addMultipleNodesToApplication,
    } = useApplicationsNodeStore()

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
                    name: 'Core',
                    id: node.nodeId,
                }))
            )
        }
    }, [])

    useEffect(() => {
        // console.log(applicationNodesFromDatabase)
    }, [])

    useEffect(() => {
        // console.log('Applications nodes', applicationsNodes)
    }, [])

    // const existingNodes = applicationsNodes.find(
    //     (application) => application.applicationId === applicationId
    // )

    return (
        <div className="grid grid-cols-1 grid-rows-[1fr_6fr] md:grid-rows-[1fr] md:grid-cols-[1fr_6fr] h-[84vh]">
            <NodeLibrary
                coreNodes={coreNodes}
                applicationId={applicationId}
            ></NodeLibrary>
            <GraphEditor
                // existingNodes={existingNodes?.existingNodes}
                applicationId={applicationId}
            ></GraphEditor>
        </div>
    )
}
