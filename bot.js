const { Telegraf, Markup } = require('telegraf');

// Render automatically injects process.env.BOT_TOKEN from your Environment Variables
const bot = new Telegraf(process.env.BOT_TOKEN);

// Replace with your actual Vercel/Netlify HTTPS Mini App URL
const MINI_APP_URL = process.env.MINI_APP_URL || "https://gympro1-iota.vercel.app/";

// Handle /start command
bot.start((ctx) => {
    return ctx.reply(
        `🏋️‍♂️ *Welcome to BodyPump Pro!*\n\nYour pocket fitness hub, rest timer, and rewards platform. Tap below to launch your dashboard.`,
        {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.webApp('🚀 Launch BodyPump App', MINI_APP_URL)],
                [Markup.button.callback('ℹ️ Help & Info', 'help_info')]
            ])
        }
    );
});

// Handle help callback button
bot.action('help_info', (ctx) => {
    return ctx.reply('BodyPump Pro helps you track workouts, cut rest intervals with boosters, and earn rewards through our app!');
});

// Launch the bot container
bot.launch().then(() => {
    console.log('BodyPump Telegram Bot successfully running in the cloud!');
});

// Enable graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
