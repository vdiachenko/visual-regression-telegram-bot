import backstop from '../../backstop'
import Markup from 'telegraf/markup'

const generateMessage = (testId, id, message) =>
    `*ID: *#${testId}\n*Project:* ${id}\n*Status:* ${message}`

export default async ({ reply, replyWithMarkdown, state }) => {
    try {
        const args = state.command.args
        const { status, message, id, reportPath, testId } = await backstop(
            'test',
            ...args
        )

        if (status !== 'success') {
            replyWithMarkdown(
                generateMessage(testId, id, message),
                Markup.inlineKeyboard([
                    Markup.urlButton(
                        '📋 View report',
                        process.env.PUBLIC_URL + reportPath
                    ),
                    Markup.callbackButton('✅ Approve', 'approve'),
                ]).extra()
            )
        } else {
            replyWithMarkdown(generateMessage(testId, id, message))
        }
    } catch (err) {
        reply('Something went wrong... 😢')
    }
}
