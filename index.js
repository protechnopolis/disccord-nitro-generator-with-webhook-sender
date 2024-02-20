const axios = require('axios');

const caracteres = Array.from({ length: 10 }, (_, i) => String.fromCharCode(48 + i))
    .concat(Array.from({ length: 26 }, (_, j) => String.fromCharCode(65 + j)))
    .concat(Array.from({ length: 26 }, (_, k) => String.fromCharCode(97 + k)));

const webhookUrl = 'https://discord.com/api/webhooks/1209162417267810326/WwW3ZO785tYKtfPn1JGEh5Lee-nYCtWA7ErtN-h11tDtX0J1dwPdTUyErhxaRwNic63h'; // Remplacez ceci par l'URL complète de votre webhook

const generateNitroCode = () => {
    const nitrocode = Array.from({ length: 16 }, () => caracteres[Math.floor(Math.random() * caracteres.length)]).join('');
    return nitrocode;
};

const sendCodeToWebhook = async (nitrocode) => {
    try {
        await axios.post(webhookUrl, { content: `https://discord.gift/${nitrocode}` });
        console.log(`Code Nitro envoyé avec succès à la webhook.`);
    } catch (error) {
        console.error('Erreur lors de l\'envoi du code à la webhook:', error.message);
    }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const sendCodesPeriodically = async () => {
    while (true) {
        const nitrocode = generateNitroCode();
        console.log(`https://discord.gift/${nitrocode}`);

        // Envoi du code à la webhook
        await sendCodeToWebhook(nitrocode);

        
        await delay(1000);
    }
};


sendCodesPeriodically();
