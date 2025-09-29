export interface Brand {
    id: number;
    name: string;
}

export interface BrandResponse {
    brands: Brand[];
    meta?: { has_more?: boolean };
    links?: { next?: string };
}
