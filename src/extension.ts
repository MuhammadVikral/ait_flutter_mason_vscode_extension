import * as vscode from "vscode";
import { registerNewPackageCommand } from "./module/new_package";
import { registerNewPageCommand } from "./module/new_page";
import { registerNewEntityCommand } from "./module/new_entity";

export function activate(context: vscode.ExtensionContext) {
  const newPackage = registerNewPackageCommand(context);
  const newPage = registerNewPageCommand(context);
  const newEntity = registerNewEntityCommand(context);

  context.subscriptions.push(newPackage, newPage, newEntity);
}

export function deactivate() {}
