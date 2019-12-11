import { FunctionComponent, SVGProps } from 'react';
import { WindowsIcon, AppleIcon, LinuxIcon } from 'assets/icons';

export default (platforms: string[]) => {
  const result: FunctionComponent<SVGProps<SVGSVGElement>>[] = [];

  platforms
    .forEach(platform => {
      switch (platform) {
        case 'windows':
          result.push(WindowsIcon);
          break;
        case 'mac_os':
          result.push(AppleIcon);
          break;
        case 'linux':
          result.push(LinuxIcon);
          break;
      }
    });

  return result;
};
