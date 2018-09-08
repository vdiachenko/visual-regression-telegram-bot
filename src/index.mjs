import bot from './bot'
import server from './server'
;(async () => {
    const webhookUrl = `${process.env.PUBLIC_URL}/${process.env.BOT_TOKEN}`
    const { url: currentWebhookUrl } = await bot.telegram.getWebhookInfo()

    if (currentWebhookUrl !== webhookUrl) {
        await bot.telegram.deleteWebhook()
        await bot.telegram.setWebhook(webhookUrl)
    }

    server.listen(process.env.PORT, process.env.ADDRESS, () =>
        console.log(`Server listening on ${process.env.PORT}`)
    )
})().catch(console.log)
