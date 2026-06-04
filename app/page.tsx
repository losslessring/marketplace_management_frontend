import Applications from './applications/Applications'

export default async function Home() {
    return (
        <>
            {/* @ts-expect-error Async Server Component */}
            <Applications />
        </>
    )
}
