import * as vscode from "vscode";
import * as path from "path";
import * as child_process from "child_process";

export function registerNewPackageCommand(context: vscode.ExtensionContext) {
  return vscode.commands.registerCommand(
    "ait-mason.new-package",
    async (resource) => {
      const workspaceFolder = vscode.workspace.getWorkspaceFolder(resource);
      const cwd = workspaceFolder.uri.fsPath;
      const relativePath = path.relative(cwd, resource.fsPath);
      const name = await vscode.window.showInputBox({
        prompt: "Enter a name for the package",
      });
      if (name === undefined || name === "") {
        vscode.window.showInformationMessage("No name provided. Aborting.");
      } else {
        const cliCommand = `mason make ait_new_package --name ${name} -o ${relativePath}`;
        try {
          const result = child_process.execSync(cliCommand, { cwd: cwd });
          child_process.execSync("melos bootstrap", {
            cwd: cwd,
          });
          vscode.window.showInformationMessage(
            `CLI command executed successfully: ${result}`,
          );
        } catch (error) {
          vscode.window.showErrorMessage(
            `Error running CLI command: ${error.message}`,
          );
        }
      }
    },
  );
}
