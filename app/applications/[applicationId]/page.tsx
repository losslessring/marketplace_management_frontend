import BackButton from '@/app/components/BackButton'
import NodeEditor from '@/app/components/nodeEditor/NodeEditor'
import SaveGraphButton from '@/app/components/nodeEditor/SaveGraphButton'
import getApplication from './getApplication'
import getApplicationNodes from './getApplicationNodes'
import getCoreNodes from './getCoreNodes'

interface SingleApplicationProps {
    params: { applicationId: string }
}

export default async function SingleApplication({
    params,
}: SingleApplicationProps) {
    const applicationId = +params.applicationId
    const [application, coreNodes, applicationNodesFromDatabase] =
        await Promise.all([
            getApplication(applicationId),
            getCoreNodes(),
            getApplicationNodes(applicationId),
        ]).then((values) => {
            return values
        })

    return (
        <div>
            <BackButton>Back</BackButton>
            <div className="mb-1">{application.name}</div>
            <SaveGraphButton applicationId={applicationId}></SaveGraphButton>
            <NodeEditor
                coreNodes={coreNodes}
                applicationId={application.id}
                applicationNodesFromDatabase={applicationNodesFromDatabase}
            ></NodeEditor>
        </div>
    )
}
