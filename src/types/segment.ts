import { RolesList } from 'types/role';

export interface Segment {
    id: number;
    title: string;
    description: string;
    parentSegment: Pick<Segment, 'id' | 'title'> | null;
    createTime: string;
    roles: RolesList;
    tags: string[];
}
export type SegmentsList = Segment[];
