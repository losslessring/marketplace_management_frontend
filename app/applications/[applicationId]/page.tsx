import BackButton from '@/app/components/BackButton'
import AppEditor from '@/app/components/nodeEditor/AppEditor'
import ConnectionModeButton from '@/app/components/nodeEditor/ConnectionModeButton'
import DeleteNodesButton from '@/app/components/nodeEditor/DeleteNodesButton'
import SaveGraphButton from '@/app/components/nodeEditor/SaveGraphButton'
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
        nodesData,
    ] = await Promise.all([
        getApplication(applicationId),
        getCoreNodes(),
        getApplicationNodes(applicationId),
        getApplicationConnections(applicationId),
        getNodesData(applicationId),
    ]).then((values) => {
        return values
    })

    return (
        <div className="application-editor-container">
            <div className="navbar">
                <BackButton>Back</BackButton>
                <div className="mb-1">{application.name}</div>
                <SaveGraphButton
                    applicationId={applicationId}
                ></SaveGraphButton>
                <DeleteNodesButton className="ml-4"></DeleteNodesButton>
                <ConnectionModeButton></ConnectionModeButton>
            </div>
            <AppEditor
                coreNodes={coreNodes}
                applicationId={application.id}
                applicationNodesFromDatabase={applicationNodesFromDatabase}
                connectionsFromDatabase={connectionsFromDatabase}
                nodesData={nodesData}
            ></AppEditor>
        </div>
    )
}
