import Whitelist from './whitelist';

const whitelist = new Whitelist();

const getCurrentTabHost = (): Promise<string | null> => {
    return new Promise((res) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length < 1) res(null);

            const url = new URL(tabs[0].url);

            if (url.protocol !== 'https:' && url.protocol !== 'http:') {
                res(null);
            }

            res(url.host);
        });
    });
};

class WebsiteTable {
    private table: HTMLTableSectionElement;

    constructor(id: string) {
        let table = document.getElementById(id) as HTMLTableElement;
        this.table = table.createTBody();
    }

    addAll(websites: Array<string>) {
        for (const website of websites) {
            this.add(website);
        }
    }

    add(website: string) {
        const row = this.table.insertRow(-1);

        row.insertCell(0).appendChild(document.createTextNode(website));

        const cell = row.insertCell(1);
        cell.innerHTML = `
            <div class="close-container">
                <div class="leftright"></div>
                <div class="rightleft"></div>
            </div>
        `;

        cell.addEventListener(
            'click',
            () => {
                whitelist.removeWebsite(website);
                row.parentNode.removeChild(row);
            },
            {
                once: true,
            }
        );

        return row;
    }
}

const main = async () => {
    const websites = await whitelist.getWebsites();
    const websiteTable = new WebsiteTable('list-of-crappy-websites');

    const addBtn = document.getElementById('add_website');

    addBtn.addEventListener('click', async () => {
        const url = await getCurrentTabHost();

        if (url) {
            whitelist.addWebsite(url);
            websiteTable.add(url);
        }
    });

    websiteTable.addAll(websites);
};

main();
