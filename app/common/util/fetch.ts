import { cookies } from 'next/headers'
import { API_URL } from '../constants/api'
import { getErrorMessage } from './errors'

const getHeaders = () => ({
    Cookie: cookies().toString(),
})

export const postNode = async (path: string, data: any) => {
    const res = await fetch(`${API_URL}/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getHeaders() },
        body: JSON.stringify(data),
    })
    const parsedRes = await res.json()
    if (!res.ok) {
        return { error: getErrorMessage(parsedRes) }
    }
    return { error: '' }
}

export const postData = async (path: string, data: any = undefined) => {
    const res = await fetch(`${API_URL}/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getHeaders() },
        body: data ? JSON.stringify(data) : undefined,
    })
    const parsedRes = await res.json()
    if (!res.ok) {
        return { error: getErrorMessage(parsedRes) }
    }
    return parsedRes
}

export const put = async (path: string, data: any) => {
    const res = await fetch(`${API_URL}/${path}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getHeaders() },
        body: JSON.stringify(data),
    })

    const parsedRes = await res.json()

    return parsedRes
}

export const fetchRequest = async (path: string, method: string, data: any) => {
    const res = await fetch(`${API_URL}/${path}`, {
        method,
        headers: { 'Content-Type': 'application/json', ...getHeaders() },
        body: JSON.stringify(data),
    })

    const parsedRes = await res.json()

    console.log(parsedRes)

    return parsedRes
}

export const post = async (path: string, formData: FormData) => {
    const res = await fetch(`${API_URL}/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getHeaders() },
        body: JSON.stringify(Object.fromEntries(formData)),
    })
    const parsedRes = await res.json()
    if (!res.ok) {
        return { error: getErrorMessage(parsedRes) }
    }
    return { error: '' }
}

export const get = async <Response>(path: string, tags?: string[]) => {
    // unstable_noStore()
    const res = await fetch(`${API_URL}/${path}`, {
        headers: { ...getHeaders() },
        next: { tags },
        cache: 'no-store',
    })
    return res.json() as Response
}
