import url from 'url'
import fastify from 'fastify'
import serve from 'fastify-static'
import bot from '../bot'
import expose from '../backstop/expose'

const app = fastify()
const webhook = '/' + process.env.BOT_TOKEN

app.register(serve, {
    root: expose.__dirname,
})

app.use(bot.webhookCallback(webhook))

export default app
