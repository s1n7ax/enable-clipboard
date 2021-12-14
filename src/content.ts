import Whitelist from './whitelist';

const eventsToBypass: Array<string> = ['copy', 'paste', 'contextmenu'];

const eventCallback = (event: Event) => {
    console.log(
        `EnableClipboard:: preventing ${event.type} handlers in the website`
    );
    event.stopPropagation();
};

const main = async () => {
    const whitelist = new Whitelist();
    const websites = await whitelist.getWebsites();

    const hostname = window.location.host;

    if (~websites.indexOf(hostname)) {
        console.log(`EnableClipboard:: registering event handlers`);

        for (const event of eventsToBypass) {
            window.addEventListener(event, eventCallback, true);
        }
    }
};

main();
