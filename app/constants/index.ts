export const WITTY_401_MESSAGES = [
    "I'm sorry, I don't think we've met formally. F*** off! 🤝",
    "My security system says you're a stranger. Want to change that? 🚪",
    "I'd love to let you in, but I need to know it's really you. 🕵️‍♂️",
    "Hold on! My digital bouncer isn't seeing your name on the guest list. 📝",
    "I'm a bit picky about who gets behind the scenes. Forget it! 🔒",
    "Whoops! It seems you're trying to access my private stash. 🙅‍♂️",
    "I'd give you a tour, but you'll need a ticket first! 🎫",
    "My mom told me not to talk to unauthenticated users. 🙊",
    "I've locked this one for a reason. Get lost! 🔑",
    "Wait, did you lose your key to my blog? 🗝️",
    "Nice try, but I don't let just anyone edit my masterpieces. 😉",
    "Are you a ghost? Because I can't see your credentials. 👻",
    "I'm sure you're cool, but my API isn't convinced yet. Bye! 😎",
    "This section is for my eyes (and authorized ones) only! 👁️",
    "Connection refused! My firewall has an attitude today. 🔥",
    "I'd let you in, but I'm waiting for the secret password (aka yo mama). 🤫",
    "Your session must have expired while I was making coffee. ☕",
    "Wait, who are you again? My server is having an identity crisis. 🎭",
];

export const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * WITTY_401_MESSAGES.length);
    return WITTY_401_MESSAGES[randomIndex];
}