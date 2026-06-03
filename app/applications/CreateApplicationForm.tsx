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
        <form action={formAction} className="flex flex-col gap-2 m-4">
            {state?.error ? (
                <div className="form-error">{state.error}</div>
            ) : (
                ''
            )}
            <div>
                <label>Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    defaultValue={'Application'}
                    className="dialog-input"
                />
            </div>
            <div>
                <label>Description</label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    required
                    defaultValue={'Application description'}
                    className="dialog-input"
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
