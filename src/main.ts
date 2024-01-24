import { App, Editor, MarkdownView, Plugin, PluginSettingTab, Setting, addIcon } from 'obsidian';
//import { DEFAULT_SETTINGS, TodoCaptureSettings, TodoCaptureSettingTab } from './settings';

interface TodoCaptureSettings {
	ribbonIcon: boolean;
	ribbonCommandUsesCode: boolean;
	matchPhrase: string;
	headingLevel: string;
	headingText: string;
}

const DEFAULT_SETTINGS: TodoCaptureSettings = {
	ribbonIcon: true,
	ribbonCommandUsesCode: true,
	matchPhrase: 'TODO',
	headingLevel: '"####',
	headingText: 'TODO Items collected from this document'
}

const ribbonSvgIcon = `
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" fill="currentColor">
  <path d="M8.66,1.68v4.28h-1.51l-.99-1.32v4.73l1,1.33v1.19H2.69l-1-1.32v-1.44l.6-.09c.31-.06.41-.5.41-1.05v-2.04h-1.04L.2,4.65V.15h7.31l1.16,1.54ZM.48,4.37h.92v-.88c0-.92.24-1.94.91-1.94.6,0,.66.93.66,1.52v5.02c0,.72-.13,1.18-.52,1.25l-.5.08v.89h3.79v-.89l-.49-.08c-.41-.08-.53-.53-.53-1.25V3.06c0-.6.06-1.52.66-1.52.67,0,.91,1.02.91,1.94v.88h.93V.43H.48v3.94ZM6.95.7v3.4h-.39v-.55c0-.99-.2-2.27-1.18-2.27-.67,0-.93.56-.93,1.51v2.41c-.14-.13-.36-.13-.58,0,.09.2.27.53.49.77-.22.52-.39,1.24-.52,2.57-.11-1.33-.28-2.05-.5-2.57.22-.24.39-.56.49-.77-.2-.13-.42-.13-.6,0v-2.41c0-.94-.25-1.51-.92-1.51-.97,0-1.18,1.29-1.18,2.27v.55h-.39V.7h6.21ZM3.88,5.18c.09-.55.27-.86.47-1.1-.2-.38-.38-.94-.5-2.12-.11,1.18-.28,1.74-.5,2.12.22.23.39.55.49,1.1h.05ZM17.18,7.5c0,3.01-1.63,4.5-3.81,4.5s-4.39-1.66-4.39-5.1v-3.01C8.98,1.54,10.67.05,12.5.05c2.99,0,4.67,2.67,4.67,4.56v2.88ZM15.75,3.86c-.02-1.96-1.29-3.54-3.24-3.54s-3.25,1.69-3.25,3.54l-.02,2.99c-.02,2.13,1.3,3.54,3.26,3.54s3.26-1.68,3.24-3.65v-2.88ZM11.09,5.2c-.12-.13-.44-.13-.75,0,.08.2.27.52.49.77-.22.52-.49,1.51-.28,2.57-.41-1.11-.63-2.04-.74-2.57.22-.25.38-.56.49-.77-.3-.13-.63-.13-.77,0v-1.33c0-1.6,1.07-3.28,2.98-3.28s2.96,1.68,2.96,3.28v1.33c-.14-.13-.46-.13-.77,0,.11.2.27.52.49.77-.09.58-.22,1.44-.72,2.57.11-1.13-.06-2.05-.3-2.57.23-.25.41-.56.49-.77-.31-.13-.63-.13-.75,0v-2.12c0-1.52-.6-2.02-1.4-2.02s-1.41.5-1.41,2.02v2.12ZM10.34,5.17c.08-.55.27-.85.49-1.1-.28-.61-.28-1.25-.16-2.1-.44.75-.67,1.36-.86,2.1.22.25.39.55.49,1.1h.05ZM11.39,3.08c0-.88.17-1.74,1.11-1.74s1.11.86,1.11,1.74v4.17c0,1.07-.19,2.15-1.11,2.15s-1.11-1-1.11-2.15V3.08ZM13.35,3.63c0-.63-.03-1.07-.25-1.07-.19,0-.3.31-.3,1.14v3.7c0,.61.05,1.32.2,1.32.24,0,.35-.66.35-1.51v-3.59ZM14.7,5.17c.09-.55.27-.85.49-1.1-.2-.72-.41-1.38-.86-2.1.12.69.12,1.49-.16,2.1.23.25.41.55.49,1.1h.05ZM6.81,14.6c0-.72-.22-.94-.52-.97l-.5-.09v-1.44h4.84c2.54,0,4.58,2.87,4.58,6.62,0,2.99-2.12,5.14-3.9,5.14h-4.52l-1-1.32v-1.44l.61-.09c.3-.06.41-.5.41-1.05v-5.35ZM7.08,20.03c0,.72-.13,1.18-.5,1.25l-.5.08v.89h3.87c2.21,0,3.84-2.15,3.84-4.83,0-3.65-1.36-5.05-3.29-5.05h-4.42v.89l.5.08c.31.06.5.52.5,1.25v5.42ZM7.36,14.6c0-1.19-.33-1.49-.61-1.55l-.41-.06v-.35h4.17c2.62,0,2.93,2.71,2.99,4.5-.22-.13-.44-.13-.75,0,.17.22.36.52.44.77-.11.89-.58,1.71-1.3,2.57.44-1,.52-1.82.27-2.57.24-.19.47-.47.53-.77-.28-.13-.53-.13-.72,0,.06-3.12-.61-3.92-1.6-3.92h-1.03c-.63,0-.77.67-.77,1.46v2.46c-.19-.13-.38-.13-.6,0,.08.2.27.53.49.77-.22.52-.41,1.24-.5,2.57-.13-1.33-.3-2.05-.5-2.57.2-.23.38-.56.47-.77-.24-.13-.42-.13-.56,0v-2.54ZM7.97,17.13c.11-.55.28-.86.49-1.1-.2-.38-.38-.94-.5-2.12-.13,1.18-.3,1.74-.5,2.12.2.24.38.55.47,1.1h.05ZM10.45,13.49c.67,0,1.22.63,1.22,3.78,0,1.54-.47,3.86-1.61,3.86h-.72c-.33,0-.49-.38-.49-1.1v-5.35c0-.72.03-1.19.53-1.19h1.07ZM10.7,15.09c-.24,0-.42.28-.42.74v4.5c0,.14.06.28.22.28.19,0,.91-1.49.91-3.34,0-1.6-.11-2.18-.34-2.18h-.36ZM12.75,17.13c.17-.33.31-.72.44-1.1-.14-.45-.38-1.02-.93-2.12.17,1.16.17,1.73-.11,2.12.28.28.49.74.53,1.1h.06ZM23.8,19.45c0,3.01-1.63,4.5-3.81,4.5s-4.39-1.66-4.39-5.1v-3.01c0-2.35,1.69-3.84,3.53-3.84,2.99,0,4.67,2.66,4.67,4.56v2.88ZM22.38,15.81c-.02-1.96-1.29-3.54-3.25-3.54s-3.24,1.69-3.24,3.54l-.02,2.99c-.02,2.13,1.3,3.54,3.26,3.54s3.26-1.68,3.25-3.65v-2.88ZM17.72,17.14c-.13-.13-.44-.13-.75,0,.08.2.27.52.49.77-.22.52-.49,1.51-.28,2.57-.41-1.11-.63-2.04-.74-2.57.22-.25.38-.56.49-.77-.3-.13-.63-.13-.77,0v-1.33c0-1.6,1.07-3.28,2.98-3.28s2.96,1.68,2.96,3.28v1.33c-.14-.13-.45-.13-.77,0,.11.2.27.52.49.77-.09.58-.22,1.44-.72,2.57.11-1.13-.06-2.05-.3-2.57.24-.25.41-.56.49-.77-.31-.13-.63-.13-.75,0v-2.12c0-1.52-.6-2.02-1.4-2.02s-1.41.5-1.41,2.02v2.12ZM16.97,17.11c.08-.55.27-.85.49-1.1-.28-.61-.28-1.25-.16-2.1-.44.75-.67,1.36-.86,2.1.22.25.39.55.49,1.1h.05ZM18.02,15.03c0-.88.17-1.74,1.11-1.74s1.11.86,1.11,1.74v4.17c0,1.07-.19,2.15-1.11,2.15s-1.11-1-1.11-2.15v-4.17ZM19.98,15.57c0-.63-.03-1.07-.25-1.07-.19,0-.3.31-.3,1.14v3.7c0,.61.05,1.32.2,1.32.23,0,.35-.66.35-1.51v-3.59ZM21.33,17.11c.09-.55.27-.85.49-1.1-.2-.72-.41-1.38-.86-2.1.13.69.13,1.49-.16,2.1.24.25.41.55.49,1.1h.05Z"/>
</svg>
`;

addIcon('vertisan-logo', ribbonSvgIcon);

export default class TodoCapture extends Plugin {
	ribbonIcon: HTMLElement;
	settings: TodoCaptureSettings;

	async onload() {
		console.log('Loading ' + this.manifest.name + ' plugin');
		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new TodoCaptureSettingTab(this.app, this));

		await this.loadSettings();

		this.refreshIconRibbon();

		// Wire-up to the Command Palette
		// This adds the editor command which operates on the current editor instance
		this.addCommand({
			id: 'obsidian-doc-todo-collector-plugin',
			name: 'Collect TODOs',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.extractTodosFromCurrentNote(editor, view);
			}
		});

	}

	async extractTodosFromCurrentNote(editor: Editor, view: MarkdownView): Promise<void> {
		const matchPhrase = this.settings.matchPhrase || 'TODO';
		const headingLevel = this.settings.headingLevel || '####';
		const headingText = this.settings.headingText || 'TODO Items collected from this document';

		// TODO: account for lines with checkboxes
		// Match lines that start with '#' or '-' also. Good for tags like #todo
		// The "i" flag in the following regex makes it case insensitive
		const patternToMatch = new RegExp(("^(#?|-?)" + matchPhrase + " "), "i");
		const compoundedHeading = headingLevel + " " + headingText;

		if (!editor) {
			console.error('Editor is undefined');
			return;
		}

		const content = editor.getValue();
		const lines = content.split('\n');

		let todoLines: string[] = [];
		let modifiedContent: string[] = [];
		let inTodoSection = false;
		let hasTodoSection = false;

		lines.forEach(line => {

			if (patternToMatch.test(line)) {
				todoLines.push(line);
			} else if (line.trim() === compoundedHeading.trim()) {
				inTodoSection = true;
				hasTodoSection = true;
				modifiedContent.push(line);
			} else {

				if (inTodoSection && line.trim() === "") {

				} else if (inTodoSection) {
					inTodoSection = false;
				}

				modifiedContent.push(line);
			}
		});

		if (todoLines.length > 0) {
			if (!hasTodoSection) {
				modifiedContent.push(compoundedHeading);
			}

			modifiedContent.push(...todoLines);
			editor.setValue(modifiedContent.join('\n'));
		}
	}

	async collectDocumentTODOs() {
		// TODO: Wire this up
	}

	onunload() { }

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	refreshIconRibbon = () => {
		this.ribbonIcon?.remove();
		if (this.settings.ribbonIcon) {
			this.ribbonIcon = this.addRibbonIcon('vertisan-logo', 'Collect document TODOs', () => {
				const ribbonCommand = this.settings.ribbonCommandUsesCode ? 'obsidian-doc-todo-collector-plugin' : 'obsidian-doc-todo-collector-plugin';
				this[ribbonCommand]();
			});
		}
	};

	async collectTODOs()
	{
	  console.log('[TODO] Executing method collectTODOs...');
	  let editor = app.workspace.getActiveViewOfType(MarkdownView)?.editor;
 
	  if (editor == null) {
		console.log('[TODO] Editor object is null.');
		return;
	  }
	  this.extractTodosFromCurrentNote(editor, null);
  
	}
}

// Collect the values from the user on the Community Plugins settings
class TodoCaptureSettingTab extends PluginSettingTab {
	plugin: TodoCapture;

	constructor(app: App, plugin: TodoCapture) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();
		containerEl.createEl("h2", { text: "TODO Collector Defaults" });
		new Setting(containerEl)
			.setName('Display Ribbon Icon')
			.setDesc('Toggle this OFF if you want to hide the Ribbon Icon.')
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings.ribbonIcon).onChange((value) => {
					this.plugin.settings.ribbonIcon = value;
					this.plugin.saveSettings();
					this.plugin.refreshIconRibbon();
				}),
			);
		new Setting(containerEl)
			.setName("matchPhrase")
			.setDesc(
				"Specify the phrase you want to target which is at the beginnig of a line. For example, TODO. Line prefixes such as # and - are automatically matched, so they don't need to be specified."
			)
			.addText((text) =>
				text
					.setPlaceholder("TODO")
					.setValue(this.plugin.settings.matchPhrase)
					.onChange(async (value) => {
						this.plugin.settings.matchPhrase = value;
						await this.plugin.saveSettings();
					})
			);
		new Setting(containerEl)
			.setName("headingLevel")
			.setDesc(
				"A new heading is created and placed at the bottom of the active document. Specify the heading level."
			)
			.addText((text) =>
				text
					.setPlaceholder("####")
					.setValue(this.plugin.settings.headingLevel)
					.onChange(async (value) => {
						this.plugin.settings.headingLevel = value;
						await this.plugin.saveSettings();
					})
			);
		new Setting(containerEl)
			.setName("headingText")
			.setDesc(
				"Specify the text that will appear as the heading title for the collected TODOs."
			)
			.addText((text) =>
				text
					.setPlaceholder("TODO Items collected from this document")
					.setValue(this.plugin.settings.headingText)
					.onChange(async (value) => {
						this.plugin.settings.headingText = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
