// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path=require('path');
const child_process=require('child_process');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "ljvscodeplugins" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let openFolder = vscode.commands.registerCommand('extension.openFolder', function () {
        // The code you place here will be executed every time your command is executed
        let files = vscode.workspace.textDocuments; 
        let dirPath =path.dirname(files[files.length - 1].fileName);
        child_process.exec(`explorer.exe ${dirPath}`);
        console.log(`open this dir:${dirPath}`);
    });
    let openCmd = vscode.commands.registerCommand('extension.openCmd', function () {
        let files = vscode.workspace.textDocuments; 
        let dirPath =path.dirname(files[files.length - 1].fileName);
        child_process.exec('start',{
            cwd:dirPath
        });
        console.log(`open cmd in this dir: ${dirPath}`);
    });
    let startSass=vscode.commands.registerCommand('extension.startSass', function () {
        let files = vscode.workspace.textDocuments; 
        let dirPath =path.dirname(files[files.length - 1].fileName);
        let dirPathList = dirPath.split('\\');
        if (dirPath.indexOf('weath\\src') >-1) {
            // weath.git start gulp need param
            let length=dirPathList.length;
            let wealthParam = `${dirPathList[length-3]}:${dirPathList[length-2]}:${dirPathList[length-1]}`;
            child_process.exec(`start gulp watch --param ${wealthParam}`, {
                cwd: dirPath
            }, function(error, stdout, stderr) {
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
        } else {
            // html.git  start gulp
            child_process.exec(`start gulp`, {
                cwd: dirPath
            }, function(error, stdout, stderr) {
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
        }
        console.log(`start sass watch ${dirPath}`);
    });
    context.subscriptions.push(openFolder);
    context.subscriptions.push(openCmd);
    context.subscriptions.push(startSass);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;