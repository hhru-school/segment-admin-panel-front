export const enum Platforms {
    Android = 'ANDROID',
    IOs = 'IOS',
    Web = 'WEB',
}

export type Platform = `${Platforms}`;
export type VersionsList = Version[];

export interface Version {
    id: number;
    platform: Platform;
    version: string;
}
