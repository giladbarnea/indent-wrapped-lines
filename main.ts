import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';


// https://forum.obsidian.md/t/soft-wrap-file-name-in-sidebar/2369/15
export default class WrapIndent extends Plugin {

	onload() {
		viewInTitle();
		// this.app.workspace.activeEditor.
		// this.app.workspace.on('editor-change', (view) => {
		// 	console.log(`%ceditor-change`, 'color: #FF4D4D', view);
		// });
		// this.app.workspace.on('css-change', () => {
		// 	console.log(`%ccss-change`, 'color: #FF4D4D');
		// });
		// this.app.workspace.onLayoutReady(() => {
		// 	console.log(`%cworkspace.onLayoutReady`, 'color: #FF4D4D');
		// 	dothing();
		// });
		sleep(1000).then(() => {
			document.styleSheets[0].insertRule('.cm-editor div.cm-content>.cm-line ', 0);
		});

		// this.registerEditorExtension(emojiListField);
	}

	onunload() {
		// document.styleSheets[0].deleteRule(0);
	}
}
async function viewInTitle() {
	while (true) {
		if (await visible('.is-live-preview')) {
			const title = await retryingQuerySelector('.inline-title');
			title.textContent = 'Wrap Indent: Live Preview';
		} else if (await visible('.markdown-reading-view')) {
			const title = await retryingQuerySelector('.inline-title');
			title.textContent = 'Wrap Indent: Reading View';
		} else if (await visible('.markdown-source-view')) {
			const title = await retryingQuerySelector('.inline-title');
			title.textContent = 'Wrap Indent: Source View';
		} else {
			console.log('neither is visible: .is-live-preview, .markdown-reading-view, .markdown-source-view');
		}
		await sleep(1000);
	}
}

function dothing(){
	const lineDivs = document.querySelectorAll('.cm-editor div.cm-content>.cm-line');
	console.log(`%cdothing()`, 'color: #FFFF4D', `lineDivs.length:`, lineDivs.length);
	let count = 0;
	for (let i = 0; i < lineDivs.length; i++) {
		const div = lineDivs[i];
		const children = div.children;
		if (children.length === 0) {
			count++;
			div.style.textIndent = '-20px';
			div.style.marginLeft = '20px';
		}
	}
	console.log(`%cdothing()`, 'color: #4DFFFF', `count:`, count);
}

async function visible(selector: string): Promise<boolean> {
	const e = await retryingQuerySelector(selector);
	if (!e) return false;
	const display = e.style?.display;
	return (display !== 'none');
}
function sleep(ms: number): Promise<unknown> {
	return new Promise(resolve => setTimeout(resolve, ms));
}
async function retryingQuerySelector(selector: string, maxRetries: number = 10, retryInterval: number = 100): Promise<Element | null> {
	let element = document.querySelector(selector);
	let retries = 0;
	while (!element && retries < maxRetries) {
		await sleep(retryInterval);
		element = document.querySelector(selector);
		retries++;
	}
	return element;
}

