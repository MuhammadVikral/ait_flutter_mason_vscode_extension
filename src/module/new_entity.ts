import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as child_process from "child_process";

export function registerNewEntityCommand(context: vscode.ExtensionContext) {
  return vscode.commands.registerCommand(
    "ait-mason.new-entity",
    async (resource) => {
      const workspaceFolder = vscode.workspace.getWorkspaceFolder(resource);
      let cwd: string = "";

      if (workspaceFolder) {
        cwd = workspaceFolder.uri.fsPath;
      } else {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a workspace.",
        );
        return;
      }

      const relativePath = path.relative(cwd, resource.fsPath);

      const name = await vscode.window.showInputBox({
        prompt: "Enter a name for the entity",
      });
      const jsonInput = await vscode.window.showInputBox({
        prompt: "Enter JSON data:",
        placeHolder: '{"key": "value", "number": 42, "array": [1, 2, 3]}',
        value: "",
      });
      if (name !== "" && name !== undefined && jsonInput) {
        try {
          const jsonData = JSON.parse(jsonInput);
          const jsonString = JSON.stringify(jsonData, null, 2);
          vscode.window.showInformationMessage(` ${jsonString}`);
          const tempFilePath = createTempJsonFile(jsonString);
          const cliCommand = `mason make ait_entity --name ${name} -c ${tempFilePath} -o ${relativePath}`;
          vscode.window.withProgress(
            {
              location: vscode.ProgressLocation.Notification,
              title: "Creating new page...",
              cancellable: false,
            },
            async (progress) => {
              try {
                const result = child_process.execSync(cliCommand, {
                  cwd: cwd,
                });
                vscode.window.showInformationMessage(
                  "Creating new page success",
                );
              } catch (error) {
                vscode.window.showErrorMessage(
                  `Error running CLI command: ${error}`,
                );
              }
            },
          );
          deleteTempJsonFile(tempFilePath);
        } catch (error) {
          vscode.window.showErrorMessage(
            `Invalid JSON input. Please enter valid JSON. ${error}`,
          );
        }
      }
    },
  );
}
function createTempJsonFile(jsonString: string): string {
  const cwd = vscode.workspace.rootPath || process.cwd();
  const tempFilePath = path.join(cwd, "temp.json");

  // Write JSON to the temporary file
  fs.writeFileSync(tempFilePath, jsonString, "utf-8");

  return tempFilePath;
}
function deleteTempJsonFile(tempFilePath: string): void {
  // Check if the file exists before attempting to delete
  if (fs.existsSync(tempFilePath)) {
    fs.unlinkSync(tempFilePath);
    console.log(`Temporary JSON file deleted: ${tempFilePath}`);
  }
}
