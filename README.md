# Superior TODO Collector for Obsidian

This is an Obsidian plugin that identifies all "TODO" notations within a note, collects them all, and then relocates them to a consolidated heading at the bottom of the note.

## Features

- Scours the current markdown document (note) looking for any lines starting with the tag "#todo", "- TODO" or simply "TODO".
- Identification of TODO line prefixes is case-insensitive.
- Automatically consolidates all of the found "TODO" lines into a new heading at the bottom of the markdown document.
- Simple one-click operation using the ribbon icon.
- Settings configuration for the heading level, the heading text, and the core matching term.
- Settings configuration to toggle the visibility of the ribbon icon.

## Plugin Installation

### Automatically from Within Obsidian

The plugin is available in the web-based Obsidian Community Plugins collection, linked here:  [Superior TODO Collector](https://obsidian.md/plugins?search=Superior%20TODO%20Collector)

The plugin can also be installed within the Obsidian app by going to  **Settings > Community plugins**,  and searching for "Superior TODO Collector" by James Vertisan.

### Manually from GitHub

1. Navigate to the releases section of the GitHub repository
2. Download the latest released `main.js` and `manifest.json` from Releases
3. Create the `obsidian-doc-todo-collector-plugin` in your Vault's plugins folder: `<vault>/.obsidian/plugins/`
4. Close and reload Obsidian
5. You will see 'Superior TODO Collector' in the list of installed Community Plugins

## Using the Plugin

### Using from the Command Palette
1. Open any note (markdown document) within Obsidian
2. Open the command palette (`CMD + p` on a Mac or `Ctrl + p` on a PC)
3. Search for and execute "Superior TODO Collector: Collect TODOs"

### Using from the Ribbon
1. Open any note (markdown document) within Obsidian
2. Click or tap on the left-hand Ribbon icon that reads "TO DO". When you point to the icon, you will notice a tooltip pop up that reads "Collect document TODOs".

### The Results
1. A new heading will be created, if it doesn't already exist, at the bottom of the open document. The heading will be "#### TODO Items collected from this document" by default. You can change the heading level and the heading text from the Community Plugins 'Settings' page.
2. All lines in your markdown document (note) starting with "#ToDo", "TODO", or "-TODO" will be extracted from their current line number and placed under the newly created heading at the bottom of the document.

## Issues and Feedback

If you have ideas or feedback to help me improve this plugin, then please create a "New issue" in [this GitHub repository](https://github.com/JamesVertisan/obsidian-document-todo-collector-plugin/issues). It will be the green button on the right-hand side of the page.

## Developer Credits

This plugin was created by [James Vertisan](https://instagram.com/james.vertisan).

## License

This project is licensed under the MIT License. Please see `LICENSE.md` for the complete license.
