'use client'
import { ICoreNode } from '@/app/applications/interfaces/coreNode.interface'
import { useApplicationsNodeStore, useNodeStore } from '@/app/stores/node-store'
import { useEffect } from 'react'
import GraphEditor from './GraphEditor'
import NodeLibrary from './NodeLibrary'

export default function NodeEditor({
    coreNodes,
    applicationId,
}: {
    coreNodes: ICoreNode[]
    applicationId: number
}) {
    // const [existingNodes, setExistingNodes] = useState<ICoreNode[]>([])
    const { existingNodes } = useNodeStore()
    const { applicationsNodes, initApplication } = useApplicationsNodeStore()

    useEffect(() => {
        initApplication(applicationId)
    }, [])

    useEffect(() => {
        console.log('Applications nodes', applicationsNodes)
    }, [applicationsNodes])

    useEffect(() => {
        console.log(existingNodes)
    }, [existingNodes])
    return (
        <div className="grid grid-cols-1 grid-rows-[1fr_6fr] md:grid-rows-[1fr] md:grid-cols-[1fr_6fr] h-[84vh]">
            <NodeLibrary
                coreNodes={coreNodes}
                existingNodes={existingNodes}
                applicationId={applicationId}
            ></NodeLibrary>
            <GraphEditor existingNodes={existingNodes}></GraphEditor>
        </div>
    )
}
