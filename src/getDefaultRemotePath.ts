// Copyright (c) 2021 Visiosto oy
// Licensed under the Apache License, Version 2.0

export default function getDefaultRemotePath(version: string): string {
  const repository = process.env.GITHUB_REPOSITORY?.split('-').join('_');
  const path = `${repository}/${version}_version.txt`;
  return path;
}
