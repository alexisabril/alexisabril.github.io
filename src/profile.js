import fs from 'fs/promises'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'

const profile = getDocument('data/profile.pdf').promise

const getContent = (profile) => {
  const pages = []

  // getPage is 1-indexed
  for (let i = 1; i <= profile.numPages; i++) {
    const content = profile.getPage(i).then((page) => page.getTextContent())
    pages.push(content)
  }

  return pages
}

const concatContent = (pages) =>
  Promise.all(pages).then((pages) =>
    pages.reduce((acc, page, i) => {
      page.items.forEach(({ str }) => {
        acc += str
      })

      return acc
    }, '')
  )

const writeProfile = (content) => fs.writeFile('data/profile.txt', content)

profile
  .then(getContent)
  .then(concatContent)
  .then(writeProfile)
  .catch(console.error)
