import { Plugin } from "obsidian";

export default class ExamplePlugin extends Plugin {
  async onload() {
    this.registerMarkdownCodeBlockProcessor("dynamic-embed", (source, el, ctx) => {
    //   const rows = source.split("\n").filter((row) => row.length > 0);
    console.log(source);
    console.log(el);
    console.log(ctx);

    //   const table = el.createEl("table");
    //   const body = table.createEl("tbody");

    //   for (let i = 0; i < rows.length; i++) {
    //     const cols = rows[i].split(",");

    //     const row = body.createEl("tr");

    //     for (let j = 0; j < cols.length; j++) {
    //       row.createEl("td", { text: cols[j] });
    //     }
    //   }
    });
  }
}