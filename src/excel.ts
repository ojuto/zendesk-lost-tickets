import xlsx from 'json-as-xlsx';
import { Ticket } from './ticket';
import { Group } from './group';
import { Brand } from './brand';

export function generateExcel(tickets: Ticket[], groups: Group[], brands: Brand[]) {
    const groupById = new Map<number, string>(groups.map((g) => [g.id, g.name]));
    const brandById = new Map<number, string>(brands.map((b) => [b.id, b.name]));

    let data = [
        {
            sheet: 'Lost Tickets',
            columns: [
                { label: 'Ticket ID', value: 'id' },
                {
                    label: 'Brand',
                    value: (t: any) => brandById.get(t.brand_id) ?? String(t.brand_id ?? ''),
                },
                {
                    label: 'Group',
                    value: (t: any) => groupById.get(t.group_id) ?? String(t.group_id ?? ''),
                },
            ],
            content: tickets,
        },
    ];

    let settings = {
        fileName: 'lost_tickets',
        extraLength: 3,
    };

    xlsx(data, settings);
}
