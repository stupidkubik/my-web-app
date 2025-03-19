import { runGeminiApi } from '../geminiApi';

export class GeminiApp {
    private promptForm: HTMLFormElement;
    private promptInput: HTMLInputElement;
    private outputDiv: HTMLElement;

    constructor() {
        this.promptForm = this.getElement<HTMLFormElement>('promptForm');
        this.promptInput = this.getElement<HTMLInputElement>('promptInput');
        this.outputDiv = this.getElement<HTMLElement>('output');
    }

    private getElement<T extends HTMLElement>(id: string): T {
        const element = document.getElementById(id);
        if (!element) {
            throw new Error(`Element with ID "${id}" not found.`);
        }
        return element as T;
    }

    public init(): void {
        this.promptForm.addEventListener('submit', this.handleSubmit.bind(this));
    }

    private async handleSubmit(event: Event): Promise<void> {
        event.preventDefault();

        const prompt: string = this.promptInput.value.trim();
        if (!prompt) {
            this.outputDiv.textContent = "Please enter a valid prompt.";
            return;
        }

        this.outputDiv.textContent = "Loading...";

        try {
            const responseText: string = await runGeminiApi(prompt);
            this.outputDiv.textContent = responseText;
        } catch (error) {
            console.error('Error processing prompt:', error);
            this.outputDiv.textContent = "An error occurred while processing the request.";
        }
    }
}