export interface FactSchema {
    path: string;
    name: string;
    description: string;
    type: "Dollar" | "Int" | "Boolean" | "Enum" | "String";
    options?: string[];
}
export interface FactResult {
    path: string;
    name: string;
    value: string;
    kind: "writable" | "derived";
    line?: string;
}
export interface DependencyInfo {
    path: string;
    name: string;
    type: string;
    isWritable: boolean;
    value?: string;
}
export interface TaxReturn {
    setFact(path: string, value: string): void;
    getFact(path: string): string;
    getDollar(path: string): number;
    getForm(formId: string): FactResult[];
    getDependencies(path: string): DependencyInfo[];
}
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
