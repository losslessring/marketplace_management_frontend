'use client'

import Link from 'next/link'
import { useFormState } from 'react-dom'
import login from './login'

export default function Login() {
    const [state, formAction] = useFormState(login, { error: '' })

    return (
        <form
            action={formAction}
            className="w-full max-w-xs flex flex-col gap-2"
        >
            {state.error ? <div className="form-error">{state.error}</div> : ''}
            <div>
                <label>Email: </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white text-xl px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
            </div>
            <div>
                <label>Password: </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-xl text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
            </div>
            <button
                type="submit"
                className="flex w-full justify-center mt-4 rounded-md bg-indigo-600 px-3 py-1.5 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Log in
            </button>
            <Link
                href="/auth/signup"
                className="underline flex w-full justify-center"
            >
                Sign up
            </Link>
        </form>
    )
    // return (
    //     <form action={formAction} className="w-full max-w-xs">
    //         <Stack spacing={2}>
    //             <TextField
    //                 error={!!state.error}
    //                 helperText={state.error}
    //                 name="email"
    //                 label="Email"
    //                 variant="outlined"
    //                 type="email"
    //             />
    //             <TextField
    //                 error={!!state.error}
    //                 helperText={state.error}
    //                 name="password"
    //                 label="Password"
    //                 variant="outlined"
    //                 type="password"
    //             />
    //             <Button type="submit" variant="contained">
    //                 Login
    //             </Button>
    //             <Link
    //                 component={NextLink}
    //                 href="/auth/signup"
    //                 className="self-center"
    //             >
    //                 Signup
    //             </Link>
    //         </Stack>
    //     </form>
    // )
}
