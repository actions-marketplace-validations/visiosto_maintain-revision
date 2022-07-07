// Copyright (c) 2021 Visiosto oy
// Licensed under the Apache License, Version 2.0

import readVersionFromNPM from '../readVersionFromNPM';

import config from '../../../package.json';

describe('function to read version from package.json file', () => {
  it('correctly reads version from package.json file', async () => {
    const version = await readVersionFromNPM();
    expect(version).toBe(config.version);
  });
});
