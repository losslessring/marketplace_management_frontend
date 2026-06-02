'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import createApplication from './createApplication'

export default function CreateApplicationForm({ action }: any) {
    const [state, formAction] = useFormState(createApplication, { error: '' })
    useEffect(() => {
        if (state?.error === '' || state?.error) {
            return
        } else {
            action()
        }
    }, [state])

    return (
        <form
            action={formAction}
            className="w-full max-w-xs flex flex-col gap-2"
        >
            {state?.error ? (
                <div className="form-error">{state.error}</div>
            ) : (
                ''
            )}
            <div>
                <label>Name: </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    defaultValue={'Application'}
                    className="block w-full rounded-md bg-white text-xl px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
            </div>
            <div>
                <label>Description: </label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    required
                    defaultValue={'Application description'}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-xl text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
            </div>
            <button
                type="submit"
                className="flex w-full justify-center mt-4 rounded-md bg-indigo-600 px-3 py-1.5 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Create
            </button>
        </form>
    )
}
