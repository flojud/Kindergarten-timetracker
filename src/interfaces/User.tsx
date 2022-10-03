export interface IUser {
    uid: string,
    email: string,
    emailVerified?: boolean,
    displayName: string,
    isAnonymous?: boolean,
    photoURL?: string,
    createdAt?: number,
    lastLoginAt?: number,
}