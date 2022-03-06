import { Plugin, MarkdownRenderer } from "obsidian";

export default class ExamplePlugin extends Plugin {
    async onload() {
        this.registerMarkdownCodeBlockProcessor("dynamic-embed", (source, el, ctx) => {
            const pattern = /\[\[([^\[\]]+?)\]\]/u;
            const fileNameMatch = pattern.exec(source);

            if (!fileNameMatch) {
                el.createEl("pre", { text: "Dynamic Embed: Error: Bad file link", cls: ["dynamic-embed", "dynamic-embed-error"] });
                return;
            }
            const fileName = fileNameMatch[1];

            const matchingFile = this.app.metadataCache.getFirstLinkpathDest(fileName, '');

            if (!matchingFile) {
                el.createEl("pre", { text: "Dynamic Embed: Error: File link not found", cls: ["dynamic-embed", "dynamic-embed-error"] });
                return;
            }

            const pFileContents = this.app.vault.read(matchingFile);
            pFileContents.then((fileContents) => {
                const container = el.createDiv({ cls: ["dynamic-embed"] });
                MarkdownRenderer.renderMarkdown(fileContents, container, ctx.sourcePath, this);
            });
        });
    }
}