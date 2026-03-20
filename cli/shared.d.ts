import type { TaxReturn, FactSchema } from "../lib/index.js";
export interface Style {
    dim: (s: string) => string;
    bold: (s: string) => string;
    green: (s: string) => string;
    yellow: (s: string) => string;
    cyan: (s: string) => string;
    red: (s: string) => string;
}
export interface CliApi {
    listForms: () => string[];
    getFormSchema: (formId: string) => FactSchema[];
    createReturn: () => Promise<TaxReturn>;
}
export interface CliSession {
    ret: TaxReturn | null;
}
export declare function banner(style: Style): string;
export declare function rule(style: Style): string;
export declare function handleLine(line: string, session: CliSession, api: CliApi, style: Style, write: (s: string) => void): Promise<boolean>;
