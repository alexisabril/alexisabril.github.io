import fs from 'fs/promises'
import OpenAI from 'openai'

const profile = fs.readFile('data/profile.txt', 'utf-8')
const openai = new OpenAI()

const previousMonth = new Date()
previousMonth.setMonth(previousMonth.getMonth() - 1)

const checkAITrends = (context) =>
  openai.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [
      { role: 'user', content: context },
      {
        role: 'user',
        content: `Can you identify software development trends and tools for the month of ${previousMonth} and summarize Alexis's strengths against those trends for the past month?`
      }
    ]
  })

const writeSummary = (content) => fs.writeFile('data/summary.md', content)

profile
  .then(checkAITrends)
  .then(
    ({
      choices: [
        {
          message: { content }
        }
      ]
    }) => content
  )
  .then(writeSummary)
  .catch(console.error)
