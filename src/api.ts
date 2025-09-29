import axios, { AxiosResponse } from 'axios';
import { Ticket, TicketResponse } from './ticket';
import { Group, GroupResponse } from './group';
import { requireEnv } from './utils';
import { Brand, BrandResponse } from './brand';

const ZENDESK_VI_BASE_URL = requireEnv('ZENDESK_VI_BASE_URL');

export const auth = Buffer.from(
    `${requireEnv('ZENDESK_VI_EMAIL')}/token:${requireEnv('ZENDESK_VI_API_TOKEN')}`,
).toString('base64');

export async function searchTickets(brand: string, groupIds: number[]): Promise<Ticket[]> {
    const tickets: Ticket[] = [];

    const negativeGroups = groupIds.map((id) => `-group:${id}`).join(' ');

    const query = `status<closed brand:"${brand}" ${negativeGroups}`;
    let url: string | null =
        `${ZENDESK_VI_BASE_URL}/api/v2/search/export.json?query=${encodeURIComponent(query)}`;

    while (url) {
        const res: AxiosResponse<TicketResponse> = await axios.get(url, {
            headers: { Authorization: `Basic ${auth}` },
            params: {
                'filter[type]': 'ticket',
                'page[size]': '100',
            },
        });

        tickets.push(...(res.data.results ?? []));

        console.log(`${tickets.length} tickets fetched from ${brand}`);

        if (!res.data.meta?.has_more) {
            break;
        }

        url = res.data.links?.next ?? null;
    }

    return tickets;
}

export async function fetchAllGroups(): Promise<Group[]> {
    const groups: Group[] = [];
    let url: string | null = `${ZENDESK_VI_BASE_URL}/api/v2/groups.json`;

    while (url) {
        const res: AxiosResponse<GroupResponse> = await axios.get(url, {
            headers: { Authorization: `Basic ${auth}` },
            params: {
                'page[size]': '100',
            },
        });

        groups.push(...res.data.groups);

        console.log(`${groups.length} groups fetched`);

        if (!res.data.meta?.has_more) {
            break;
        }

        url = res.data.links?.next ?? null;
    }

    return groups;
}

export async function fetchAllBrands(): Promise<Brand[]> {
    const brands: Brand[] = [];
    let url: string | null = `${ZENDESK_VI_BASE_URL}/api/v2/brands.json`;

    while (url) {
        const res: AxiosResponse<BrandResponse> = await axios.get(url, {
            headers: { Authorization: `Basic ${auth}` },
            params: {
                'page[size]': '100',
            },
        });

        brands.push(...res.data.brands);

        console.log(`${brands.length} brands fetched`);

        if (!res.data.meta?.has_more) {
            break;
        }

        url = res.data.links?.next ?? null;
    }

    return brands;
}
