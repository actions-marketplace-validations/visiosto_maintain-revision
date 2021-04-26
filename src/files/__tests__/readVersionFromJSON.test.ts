// Copyright (c) 2021 Visiosto oy
// Licensed under the MIT License

import readVersionFromJSON from '../readVersionFromJSON';

describe('function to read version from JSON file', () => {
  it('correctly reads version from JSON file', async () => {
    const version = await readVersionFromJSON('test/file-test.json');
    expect(version).toBe('0.1.0-dev');
  });
});