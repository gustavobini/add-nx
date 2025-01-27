import { execSync } from 'child_process';

export function addCRACommandsToWorkspaceJson(
  appName: string,
  appIsJs: boolean
) {
  execSync(
    [
      `npx nx g @nrwl/workspace:run-commands`,
      `serve`,
      `--project ${appName}`,
      `--command "node ../../node_modules/.bin/react-app-rewired start"`,
      `--cwd "apps/${appName}"`,
    ].join(' '),
    { stdio: [0, 1, 2] }
  );

  execSync(
    [
      `npx nx g @nrwl/workspace:run-commands`,
      `build`,
      `--project ${appName}`,
      `--command "node ../../node_modules/.bin/react-app-rewired build"`,
      `--cwd "apps/${appName}"`,
    ].join(' '),
    { stdio: [0, 1, 2] }
  );

  execSync(
    [
      `npx nx g @nrwl/workspace:run-commands`,
      `lint`,
      `--project ${appName}`,
      `--command "node ../../node_modules/.bin/eslint${
        appIsJs ? '' : ' src/**/*.tsx src/**/*.ts'
      }"`,
      `--cwd "apps/${appName}"`,
    ].join(' '),
    { stdio: [0, 1, 2] }
  );

  execSync(
    [
      `npx nx g @nrwl/workspace:run-commands`,
      `test`,
      `--project ${appName}`,
      `--command "node ../../node_modules/.bin/react-app-rewired test --watchAll=false"`,
      `--cwd "apps/${appName}"`,
    ].join(' '),
    { stdio: [0, 1, 2] }
  );
}
