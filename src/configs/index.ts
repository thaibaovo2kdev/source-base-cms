export enum BUILD_MODE {
    DEV = 'dev',
    PRODUCTION = 'production',
    STAGING = 'staging',
}

export const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080'
export const REACT_APP_BUILD_MODE = process.env.REACT_APP_BUILD_MODE || BUILD_MODE.DEV
export const DEFAULT_PAGINATION = {
    PAGE: 1,
    LIMIT: 20
}