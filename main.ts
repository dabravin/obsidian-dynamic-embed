import { Plugin, MarkdownRenderer } from "obsidian";

export default class DynamicEmbed extends Plugin {
    static codeBlockKeyword = "dynamic-embed";
    static containerClass = "dynamic-embed";
    static errorClass = "dynamic-embed-error";

    static displayError = (parent: HTMLElement, text: String) => {
        parent.createEl("pre", { text: "Dynamic Embed: Error: " + text, cls: [DynamicEmbed.containerClass, DynamicEmbed.errorClass] });
    }

    async onload() {
        this.registerMarkdownCodeBlockProcessor(DynamicEmbed.codeBlockKeyword, async (source, el, ctx) => {
            const pattern = /\[\[([^\[\]]+?)\]\]/u;
            const fileNameMatch = pattern.exec(source);


            if (!fileNameMatch) {
                DynamicEmbed.displayError(el, "Bad file link");
                return;
            }
            const fileName = fileNameMatch[1];
            const matchingFile = this.app.metadataCache.getFirstLinkpathDest(fileName, '');

            if (!matchingFile) {
                DynamicEmbed.displayError(el, "File link not found");
                return;
            }

            if (matchingFile.extension !== "md") {
                DynamicEmbed.displayError(el, "Bad file extension found, expected markdown");
                return;
            }

            const fileContents = await this.app.vault.cachedRead(matchingFile);
            const container = el.createDiv({ cls: [DynamicEmbed.containerClass] });
            MarkdownRenderer.renderMarkdown(fileContents, container, ctx.sourcePath, this);
        });
    }
}