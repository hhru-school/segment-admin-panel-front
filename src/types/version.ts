const PLATFORMS = ['ANDROID', 'IOS', 'WEB'] as const;

export type Platform = (typeof PLATFORMS)[number];
export type VersionsList = Version[];

export interface Version {
    id: number;
    platform: Platform;
    version: string;
}
