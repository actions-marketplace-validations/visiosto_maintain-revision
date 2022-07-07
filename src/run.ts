// Copyright (c) 2021 Visiosto oy
// Licensed under the Apache License, Version 2.0

import path from 'path';
import * as core from '@actions/core';

import getDefaultRemotePath from './getDefaultRemotePath';
import resolveDevelopmentVersion from './resolveDevelopmentVersion';

export default async function run(readVersion: Function): Promise<void> {
  core.debug('The inputs of the run are the following:');
  core.debug(`type: ${core.getInput('type')}`);
  core.debug(`file: ${core.getInput('file')}`);
  core.debug(`service: ${core.getInput('service')}`);
  core.debug(`bucket: ${core.getInput('bucket')}`);
  core.debug(`path: ${core.getInput('path')}`);
  core.debug(`upload: ${core.getInput('upload')}`);
  core.debug(`variable: ${core.getInput('variable')}`);
  core.debug(`suffix: ${core.getInput('suffix')}`);
  core.debug(`revision-number: ${core.getInput('revision-number')}`);

  try {
    const workspace = process.env.GITHUB_WORKSPACE as string;
    const versionFile = path.join(workspace, core.getInput('file'));
    const versionVariable = core.getInput('variable');

    core.debug(`The workspace of this run is ${workspace}`);
    core.info(`Reading local version data from ${versionFile}`);

    const projectVersion = await readVersion(versionFile, versionVariable);

    core.debug(`The package version is ${projectVersion}`);

    const service = core.getInput('service');
    const bucketName = core.getInput('bucket');
    const pathInput = core.getInput('path');
    const filePath = pathInput === '' ? getDefaultRemotePath(projectVersion) : pathInput;
    const revisionNumber: number =
      core.getInput('revision-number') === ''
        ? await resolveDevelopmentVersion(service, bucketName, filePath)
        : parseInt(core.getInput('revision-number'), 10);

    core.info(`The revision number for the current run is ${revisionNumber}`);

    const suffix = core.getInput('suffix');

    const fullVersion: string =
      revisionNumber === -1
        ? projectVersion
        : projectVersion.replace(`-${suffix}`, `-${suffix}.${revisionNumber}`);

    core.debug(`The full version for this run is ${fullVersion}`);

    core.saveState('filePath', filePath);
    core.saveState('revisionNumber', revisionNumber);

    core.setOutput('version', fullVersion);
    core.setOutput('package-version', projectVersion);
    core.setOutput('revision-number', revisionNumber);
  } catch (error) {
    core.debug('There was an error in the run');
    core.setFailed(error.message);
  }
}
