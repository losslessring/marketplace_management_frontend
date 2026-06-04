import getApplications from './actions/getApplications'
import Application from './Application'
import CreateApplicationButton from './createApplication/CreateApplicationButton'

export default async function Applications() {
    const applications = await getApplications()

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 m-4 auto-rows-fr">
            <CreateApplicationButton />
            {applications.map((application) => (
                <div key={application.id}>
                    <Application application={application} />
                </div>
            ))}
        </div>
    )
}
