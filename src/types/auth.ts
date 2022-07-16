export type LoginCommand = {
    email: string,
    password: string
}
export type ForgotPasswordCommand = {
    email: string
}
export type ResetPasswordCommand = {
    password: string
}
