// Copyright (c) 2021 Visiosto oy
// Licensed under the Apache License, Version 2.0

import path from 'path';

import readVersionFromJSON from './readVersionFromJSON';

// TODO Catch errors and reject the promise if the function fails
export default async function readVersionFromNPM(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filename?: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  variable?: string,
): Promise<string> {
  const workspace = process.env.GITHUB_WORKSPACE as string;
  return readVersionFromJSON(path.join(workspace, 'package.json'), 'version');
}
