import Options from '@/app/applications/Options/Options'
import logout from '@/app/auth/logout'
import BackButton from '@/app/components/BackButton'
import AppEditor from '@/app/components/nodeEditor/AppEditor'
import Header from '@/app/header/header'
import { NodeData } from '@/app/interfaces/data/NodeData'
import { NodeDataFromServer } from '@/app/interfaces/data/NodeDataFromServer'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import getApplication from './getApplication'
import getApplicationConnections from './getApplicationConnections'
import getApplicationNodes from './getApplicationNodes'
import getCoreNodes from './getCoreNodes'
import getNodesData from './getNodesData'

interface SingleApplicationProps {
    params: { applicationId: string }
}
export const dynamic = 'force-dynamic'

export default async function SingleApplication({
    params,
}: SingleApplicationProps) {
    const headersList = await headers()
    const userAgent = headersList.get('user-agent')
    revalidatePath('/')

    const applicationId = +params.applicationId
    const [
        application,
        coreNodes,
        applicationNodesFromDatabase,
        connectionsFromDatabase,
        nodeData,
    ] = await Promise.all([
        getApplication(applicationId),
        getCoreNodes(),
        getApplicationNodes(applicationId),
        getApplicationConnections(applicationId),
        getNodesData(applicationId),
    ]).then((values) => {
        return values
    })

    // console.log(nodeData)
    console.log('application nodes: ', applicationNodesFromDatabase)
    console.log('connections: ', connectionsFromDatabase)

    return (
        <div className="application-editor-container">
            <div className="navbar">
                <BackButton>Back</BackButton>&nbsp;<div>{application.name}</div>
                <Options></Options>
                <Header logout={logout} />
            </div>
            <AppEditor
                coreNodes={coreNodes}
                applicationId={application.id}
                applicationNodesFromDatabase={applicationNodesFromDatabase}
                connectionsFromDatabase={connectionsFromDatabase}
                nodeData={nodeData.map(
                    (nodeDataFromServer: NodeDataFromServer): NodeData => ({
                        id: nodeDataFromServer.nodeId,
                        type: nodeDataFromServer.nodeDataType,
                        data: nodeDataFromServer.nodeData,
                    })
                )}
            ></AppEditor>
        </div>
    )
}
