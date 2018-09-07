import url from 'url'
import fastify from 'fastify'
import serve from 'fastify-static'
import bot from '../bot'
import expose from '../backstop/expose'

const app = fastify()

app.register(serve, {
    root: expose.__dirname,
})

export default async () => {
    const webhookInfo = await bot.telegram.getWebhookInfo()
    const { pathname } = url.parse(webhookInfo.url)

    app.use(bot.webhookCallback(pathname))

    return app.listen(process.env.PORT, () => {
        console.log(`Server listening on ${process.env.PORT}`)
    })
}
