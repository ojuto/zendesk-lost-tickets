import { fetchAllBrands, fetchAllGroups, searchTickets } from './api';
import { brandGroupMap } from './utils';
import { Ticket } from './ticket';
import { generateExcel } from './excel';

async function fetchAndSave(): Promise<void> {
    try {
        const [groups, brands] = await Promise.all([fetchAllGroups(), fetchAllBrands()]);

        const ticketPromises = Array.from(brandGroupMap.entries()).map(
            async ([brandName, groupPrefix]) => {
                const groupIds = groups
                    .filter((g) => g.name.startsWith(groupPrefix))
                    .map((g) => g.id);

                if (groupIds.length === 0) {
                    console.warn(`No group found for prefix ${groupPrefix} (${brandName})`);
                    return [];
                }

                return await searchTickets(brandName, groupIds);
            },
        );

        const ticketsNested = await Promise.all(ticketPromises);
        const allTickets = ticketsNested.reduce<Ticket[]>((acc, arr) => acc.concat(arr), []);

        console.log(`Total tickets: ${allTickets.length}`);

        generateExcel(allTickets, groups, brands);
    } catch (err) {
        console.error(err);
    }
}

void fetchAndSave();
