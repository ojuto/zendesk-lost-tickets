export interface Ticket {
    id: number;
    brand_id: number;
    group_id: number;
}

export interface TicketResponse {
    results: Ticket[];
    meta?: { has_more?: boolean };
    links?: { next?: string };
}
