import backstop from '../../backstop'
import Extra from 'telegraf/extra'

const generateMessage = (testId, username) =>
    `🌀 *Test* #${testId} *approved by* @${username}`
const projectPattern = /project\:\s+(\S+)/i

export default async ({ reply, editMessageText, update }) => {
    const { from, message } = update.callback_query

    const username = from.username
    const text = message.text
    const project = projectPattern.exec(text)[1]

    try {
        const { id } = await backstop('approve', project)

        const hashtagObj = message.entities.find(
            entity => entity.type === 'hashtag'
        )
        const hashtag = text.substr(hashtagObj.offset, hashtagObj.length)
        const testId = hashtag.slice(1)
        const editedMessage = `${message.text}\n\n${generateMessage(
            testId,
            username
        )}.`

        editMessageText(editedMessage, Extra.markdown())
    } catch (err) {
        reply('Something went wrong... 😢')
    }
}
