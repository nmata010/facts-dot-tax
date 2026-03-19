export const FactDictionaryFactory: {
  importFromXml(xml: string): unknown;
};

export const GraphFactory: {
  apply(dict: unknown): {
    set(path: string, value: string): { errorType?: string; errorName?: string };
    get(path: string): { get: { toString(): string }; complete: boolean };
  };
};
