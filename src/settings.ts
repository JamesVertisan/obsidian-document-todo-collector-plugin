import { App, PluginSettingTab, Setting } from 'obsidian';
import OpenVTodo from './main';

export interface TodoCaptureSettings {
	ribbonIcon: boolean;
	ribbonCommandUsesCode: boolean;
	matchPhrase: string;
	headingLevel: string;
	headingText: string;
}

export const DEFAULT_SETTINGS: TodoCaptureSettings = {
	ribbonIcon: true,
	ribbonCommandUsesCode: true,
	matchPhrase: 'TODO',
	headingLevel:'"####',
    headingText: 'TODO Items collected from this document'
};

export class TodoCaptureSettingsTab extends PluginSettingTab {
	plugin: OpenVTodo;

	constructor(app: App, plugin: OpenVTodo) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.createEl('h3', { text: 'General settings' });

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
			.setName('Ribbon opens via `code` command')
			.setDesc(`Toggle this OFF if you'd prefer that the Ribbon Icon opens VTodo via URL.`)
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings.ribbonCommandUsesCode).onChange((value) => {
					this.plugin.settings.ribbonCommandUsesCode = value;
					this.plugin.saveSettings();
				}),
			);

		containerEl.createEl('h3', { text: 'Open via `code` CLI settings' });

		new Setting(containerEl)
			.setName('Template for executing the `code` command')
			.setDesc(
				'You can use the following variables: `{{vaultpath}}` (absolute), `{{filepath}}` (relative), `{{folderpath}}` (relative). Note that on MacOS, a full path to the VTodo executable is required (generally "/usr/local/bin/code"). Example: `/usr/local/bin/code "{{vaultpath}}" "{{vaultpath}}/{{filepath}}"`',
			)
			.addText((text) =>
				text
					.setPlaceholder(DEFAULT_SETTINGS.executeTemplate)
					.setValue(this.plugin.settings.executeTemplate || DEFAULT_SETTINGS.executeTemplate)
					.onChange((value) => {
						value = value.trim();
						if (value === '') value = DEFAULT_SETTINGS.executeTemplate;
						this.plugin.settings.executeTemplate = value;
						this.plugin.saveData(this.plugin.settings);
					}),
			);

		containerEl.createEl('h3', { text: 'Open via `vscode://` URL settings' });

		const openViaUrlCaveat = containerEl.createEl('p');
		const openViaUrlCaveatEm = openViaUrlCaveat.createEl('em', {
			text: `
				⚠️ This setting is not recommended for Windows users due to
				UX issues caused by security enhancements in VTodo on Windows.
				More information:
			`,
		});
		openViaUrlCaveatEm.appendChild(
			createEl('a', {
				text: 'Open in VTodo Readme',
				href: 'https://github.com/NomarCub/obsidian-open-vscode/blob/master/README.md#caveats-regarding-the-url-command-for-windows-users',
			}),
		);
		openViaUrlCaveatEm.appendText('.');

		new Setting(containerEl)
			.setName('Open current file')
			.setDesc('Open the current file rather than the root of the vault.')
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings.openFile || DEFAULT_SETTINGS.openFile).onChange((value) => {
					this.plugin.settings.openFile = value;
					this.plugin.saveData(this.plugin.settings);
				}),
			);

		new Setting(containerEl)
			.setName('Path to VTodo Workspace')
			.setDesc(
				'Defaults to the {{vaultpath}} template variable. You can set this to an absolute path to a ".code-workspace" file if you prefer to use a Multi Root workspace file: ',
			)
			.setClass('setting-item--vscode-workspacePath')
			.addText((text) =>
				text
					.setPlaceholder(DEFAULT_SETTINGS.workspacePath)
					.setValue(this.plugin.settings.workspacePath || DEFAULT_SETTINGS.workspacePath)
					.onChange((value) => {
						value = value.trim();
						if (value === '') value = DEFAULT_SETTINGS.workspacePath;
						this.plugin.settings.workspacePath = value;
						this.plugin.saveData(this.plugin.settings);
					}),
			);

		const workspacePathDescEl = containerEl.querySelector(
			'.setting-item--vscode-workspacePath .setting-item-description',
		);
		workspacePathDescEl!.appendChild(
			createEl('a', {
				href: 'https://code.visualstudio.com/docs/editor/workspaces#_multiroot-workspaces',
				text: 'https://code.visualstudio.com/docs/editor/workspaces#_multiroot-workspaces',
			}),
		);
		workspacePathDescEl!.appendText('.');

		new Setting(containerEl).setName('Open VTodo using a `vscode-insiders://` URL').addToggle((toggle) => {
			toggle.setValue(this.plugin.settings.useUrlInsiders).onChange((value) => {
				this.plugin.settings.useUrlInsiders = value;
				this.plugin.saveSettings();
			});
		});
	}
}
