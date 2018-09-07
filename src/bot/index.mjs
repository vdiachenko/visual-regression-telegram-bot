import Telegraf from 'telegraf'
import referenceHandler from './handlers/reference'
import testHandler from './handlers/test'
import approveHandler from './handlers/approve'
import commandArgs from './middlewares/command-args'

const webhook = process.env.PUBLIC_PATH + process.env.BOT_TOKEN
const bot = new Telegraf(process.env.BOT_TOKEN, {
    telegram: {
        webhookReply: true,
    },
    channelMode: true,
})

bot
    .command('reference', commandArgs, referenceHandler)
    .command('test', commandArgs, testHandler)
    .action('approve', approveHandler)

bot.telegram.setWebhook(webhook)

export default bot
