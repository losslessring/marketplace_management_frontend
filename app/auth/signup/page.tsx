import Link from 'next/link'
import AccessForm from '../../../app/components/AccessForm'
import createUser from './create-user'

export default function Signup() {
    return (
        <AccessForm action={createUser} buttonText="Sign up">
            <Link
                href="/auth/login"
                className="underline flex w-full justify-center"
            >
                Log in
            </Link>
        </AccessForm>
    )
}
