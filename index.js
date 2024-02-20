const axios = require('axios');

const caracteres = Array.from({ length: 10 }, (_, i) => String.fromCharCode(48 + i))
    .concat(Array.from({ length: 26 }, (_, j) => String.fromCharCode(65 + j)))
    .concat(Array.from({ length: 26 }, (_, k) => String.fromCharCode(97 + k)));

const webhookUrl = 'YOUR_WEBHOOK_URL'; // PUT YOUR WEBHOOK URL HERE
const generateNitroCode = () => {
    const nitrocode = Array.from({ length: 16 }, () => caracteres[Math.floor(Math.random() * caracteres.length)]).join('');
    return nitrocode;
};

const sendCodeToWebhook = async (nitrocode) => {
    try {
        await axios.post(webhookUrl, { content: `https://discord.gift/${nitrocode}` });
        console.log(`Nitro code sended succesfully.`);
    } catch (error) {
        console.error('Error to with sending the nitro code:', error.message);
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
