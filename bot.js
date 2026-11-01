const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();
const PORT = process.env.PORT || 3000;

const MINI_APP_URL = process.env.MINI_APP_URL || "https://gympro1-iota.vercel.app/";

// 1. Simple Express route so Render detects an open port
app.get('/', (req, res) => {
    res.send('BodyPump Bot is active and running!');
});

// 2. Telegram Bot Handlers
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

bot.action('help_info', (ctx) => {
    return ctx.reply('BodyPump Pro helps you track workouts, cut rest intervals with boosters, and earn rewards through our app!');
});

// 3. Start Express first, then launch the bot
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    bot.launch();
});

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
