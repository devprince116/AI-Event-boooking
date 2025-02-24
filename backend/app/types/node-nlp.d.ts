declare module "node-nlp" {
    export class NlpManager {
        constructor(options?: any);
        addDocument(locale: string, text: string, intent: string): void;
        train(): Promise<void>;
        process(locale: string, text: string): Promise<any>;
        save(): void;
    }
}
