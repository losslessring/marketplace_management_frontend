import BackButton from '@/app/components/BackButton'
import DeleteNodesButton from '@/app/components/nodeEditor/DeleteNodesButton'
import NodeEditor from '@/app/components/nodeEditor/NodeEditor'
import SaveGraphButton from '@/app/components/nodeEditor/SaveGraphButton'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import getApplication from './getApplication'
import getApplicationNodes from './getApplicationNodes'
import getCoreNodes from './getCoreNodes'

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
            <DeleteNodesButton className="ml-4"></DeleteNodesButton>
            <NodeEditor
                coreNodes={coreNodes}
                applicationId={application.id}
                applicationNodesFromDatabase={applicationNodesFromDatabase}
            ></NodeEditor>
        </div>
    )
}
