# Obsidian Dynamic Embed

Embed snippets, templates and any linkables by delegating the current scope to the embedded file, treating them as content instead of references, contrary to the integrated tag `![[]]`.

## Example
Import the contents of file ***`Script-note-template file name link.md`***, existing in the active vault.
Note that the link syntax does **not** support heading/block links (e.g. `[[file#heading1]]`)
~~~
```dynamic-embed
[[Script-note-template file name link]]
```
~~~