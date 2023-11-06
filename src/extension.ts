import * as vscode from "vscode";
import { registerNewPackageCommand } from "./module/new_package";
import { registerNewPageCommand } from "./module/new_page";

export function activate(context: vscode.ExtensionContext) {
  const newPackage = registerNewPackageCommand(context);
  const newPage = registerNewPageCommand(context);

  context.subscriptions.push(newPackage, newPage);
}

export function deactivate() {}
