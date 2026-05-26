import AccessForm from '@/app/components/accessForm'
import Link from 'next/link'
import login from './login'

export default function Login() {
    return (
        <AccessForm action={login} buttonText="Log in">
            <Link
                href="/auth/signup"
                className="underline flex w-full justify-center"
            >
                Sign up
            </Link>
        </AccessForm>
    )
}
