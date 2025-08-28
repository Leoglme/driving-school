/// <reference types="vite/client" />
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

/* --- shim pour vee-validate --- */
declare module 'vee-validate' {
    import type { DefineComponent } from 'vue'
    // Composants (typage minimal pour ton stack)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export const Form: DefineComponent<any, any, any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export const Field: DefineComponent<any, any, any>

    // --- defineRule (typage minimal & sûr) ---
    export type RuleResult = boolean | string | Promise<boolean | string>
    export type RuleValidator = (value: any, params?: any, ctx?: any) => RuleResult
    export function defineRule(name: string, validator: RuleValidator): void
}

/* --- shim pour @fullcalendar/vue3 --- */
declare module '@fullcalendar/vue3' {
    import type { DefineComponent } from 'vue'
    import type { CalendarOptions } from '@fullcalendar/core'
    const FullCalendar: DefineComponent<{ options?: CalendarOptions }, {}, any>
    export default FullCalendar
}
