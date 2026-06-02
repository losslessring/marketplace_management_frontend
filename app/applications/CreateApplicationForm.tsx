'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import createApplication from './createApplication'

export default function CreateApplicationForm({ handleClose }: any) {
    const [state, formAction] = useFormState(createApplication, { error: '' })
    useEffect(() => {
        if (state?.error === '' || state?.error) {
            return
        } else {
            handleClose()
        }
    }, [state])

    return (
        <form action={formAction} className="flex flex-col gap-2 m-6">
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
                    className="block w-full rounded-md bg-white text-l  px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
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
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-l text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
            </div>
            <div className="flex justify-around">
                <button
                    type="button"
                    className="dialog-btn-primary"
                    onClick={() => handleClose()}
                >
                    Cancel
                </button>
                <button type="submit" className="dialog-btn-primary">
                    Create
                </button>
            </div>
        </form>
    )
}
