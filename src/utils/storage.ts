const STORAGE_KEY = 'convention-form-state-v1'

export type StoredState<T> = {
    data: T
    updatedAt: number
}

export function loadState<T>(): T | undefined {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return undefined
        const parsed = JSON.parse(raw) as StoredState<T>
        return parsed.data
    } catch {
        return undefined
    }
}

export function saveState<T>(data: T) {
    try {
        const payload: StoredState<T> = { data, updatedAt: Date.now() }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {
        // ignore write errors
    }
}

export function clearState() {
    try {
        localStorage.removeItem(STORAGE_KEY)
    } catch {
        // ignore
    }
}
