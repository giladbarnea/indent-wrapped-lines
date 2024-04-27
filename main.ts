import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';



export default class WrapIndent extends Plugin {

	async onload() {
		document.styleSheets[0].insertRule( '.ͼ1 .cm-lineWrapping { text-indent: -0.5em; margin-left: 0.5em; }', 0);
		// this.registerEditorExtension(emojiListField);
	}

	onunload() {
		document.styleSheets[0].deleteRule(0);
	}
}




