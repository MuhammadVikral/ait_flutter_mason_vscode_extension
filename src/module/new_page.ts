import * as vscode from "vscode";
import * as path from "path";
import * as child_process from "child_process";

export function registerNewPageCommand(context: vscode.ExtensionContext) {
  return vscode.commands.registerCommand(
    "ait-mason.new-page",
    async (resource) => {
      const workspaceFolder = vscode.workspace.getWorkspaceFolder(resource);
      const cwd = workspaceFolder.uri.fsPath;
      const relativePath = path.relative(cwd, resource.fsPath);
      const name = await vscode.window.showInputBox({
        prompt: "Enter a name for the package",
      });
      const use_formx = await vscode.window.showInputBox({
        prompt: "use formx for the cubit? (true or false)",
        value: "false",
        validateInput: (input) => {
          if (input !== "false" && input !== "true") {
            return "Please enter 'true' or 'false'";
          }
          return null;
        },
      });
      const invalidInput =
        name === undefined ||
        name === "" ||
        use_formx === undefined ||
        use_formx === "";

      if (invalidInput) {
        vscode.window.showInformationMessage("No name provided. Aborting.");
      } else {
        const cliCommand = `mason make ait_new_page --name ${name} --use_formx ${use_formx} -o ${relativePath}`;
        vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            title: "Creating new page...",
            cancellable: false,
          },
          async (progress) => {
            try {
              const result = child_process.execSync(cliCommand, { cwd: cwd });
              vscode.window.showInformationMessage("Creating new page success");
            } catch (error) {
              vscode.window.showErrorMessage(
                `Error running CLI command: ${error.message}`,
              );
            }
          },
        );
      }
    },
  );
}
