import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getFirstCharacter = (str: string | undefined, fallback: string = 'N'): string => {
    return str ? str.charAt(0) : fallback
}