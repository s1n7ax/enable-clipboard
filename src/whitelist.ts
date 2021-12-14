export default class Whitelist {
    getWhitelist(): Promise<Array<string>> {
        return new Promise((res) => {
            chrome.storage.local.get('whitelist', (data: any) => {
                res(data.whitelist);
            });
        });
    }

    private setWhitelist(whitelist: Array<string>): Promise<void> {
        return new Promise((res: any) => {
            chrome.storage.local.set({ whitelist: whitelist }, () => {
                res();
            });
        });
    }

    async addWebsite(url: string): Promise<void> {
        const whitelist = await this.getWhitelist();

        if (whitelist.indexOf(url) === -1) {
            whitelist.push(url);
            await this.setWhitelist(whitelist);
        }
    }

    async removeWebsite(url: string): Promise<void> {
        const whitelist = await this.getWhitelist();

        const index = whitelist.indexOf(url);

        if (index > -1) {
            whitelist.splice(index, 1);
        }

        await this.setWhitelist(whitelist);
    }

    async getWebsites(): Promise<Array<string>> {
        return await this.getWhitelist();
    }
}
