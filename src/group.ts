export interface Group {
    id: number;
    name: string;
}

export interface GroupResponse {
    groups: Group[];
    meta?: { has_more?: boolean };
    links?: { next?: string };
}
