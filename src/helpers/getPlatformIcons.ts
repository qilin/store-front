import { FunctionComponent, SVGProps } from 'react';
import { WindowsIcon, AppleIcon, LinuxIcon, WebIcon } from 'assets/icons';
import { Platform, Maybe } from 'generated/types';

export default (platforms: Maybe<Platform>[]) => {
  const result: FunctionComponent<SVGProps<SVGSVGElement>>[] = [];

  platforms
    .forEach(platform => {
      switch (platform) {
        case Platform.Windows:
          result.push(WindowsIcon);
          break;
        case Platform.MacOs:
          result.push(AppleIcon);
          break;
        case Platform.Linux:
          result.push(LinuxIcon);
          break;
        case Platform.Web:
          result.push(WebIcon);
          break;
      }
    });

  return result;
};
