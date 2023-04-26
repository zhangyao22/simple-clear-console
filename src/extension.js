const vscode = require('vscode');

function activate(context) {
	// onCommand:simple-clear-console.clear

	context.subscriptions.push(vscode.commands.registerCommand('simple-clear-console.clear', function () {
		console.log('恭喜，您的扩展“vscode-plugin-demo”已被激活！');
		const { activeTextEditor } = vscode.window;

		if (activeTextEditor) {
			const { document } = activeTextEditor;
			const edit = new vscode.WorkspaceEdit()
			for(let i = 0; i < document.lineCount; i++) {
				const line = document.lineAt(i)
				// if (/^[\s\t]*console\.log\([\s\S]*\)$/.test(line.text)) {
				if (/^\s*console.log([\s\S]*)$/.test(line.text)) {
					// activeTextEditor.edit(editBuilder => {
					// 	editBuilder.delete(new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i + 1, 0)))
					// })
					// 没有保存，document.lineCount 不会应为删除行为减少
					edit.delete(document.uri, new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i + 1, 0)))
		    }
			}
			vscode.workspace.applyEdit(edit).then(() => {
				document.save()
			})
		}
		// vscode.window.showInformationMessage('simple-clear-console!'); 左下角弹窗提示
		// vscode.window.activeTextEditor.edit(editBuilder => {
			// 从开始到结束，全量替换
			// console.log('-=-=-=-=', editBuilder)
			// const end = new vscode.Position(vscode.window.activeTextEditor.document.lineCount + 1, 0);
			// const text = '新替换的内容';
			// editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), text);
		// });
	}));
	// 编辑器命令
	// context.subscriptions.push(vscode.commands.registerTextEditorCommand('simple-clear-console.editorCommand', (textEditor, edit) => {
	// 	console.log('您正在执行编辑器命令！');
	// 	console.log(textEditor, edit);
	// }));

	// 执行某个命令
  // vscode.commands.executeCommand('simple-clear-console.editorCommand', 'params1', 'params2');

	// 获取所有命令
  // vscode.commands.getCommands().then(allCommands => {
  //   console.log('所有命令：', allCommands);
  // });
}

function deactivate() {
	// console.log('您的扩展“vscode-plugin-demo”已被释放！')
}

module.exports = {
	activate,
	deactivate
}
