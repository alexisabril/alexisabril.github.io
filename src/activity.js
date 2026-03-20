import fs from 'fs/promises'

const USERNAME = 'alexisabril'
const TOKEN = process.env.ACTIVITY_TOKEN

if (!TOKEN) {
  console.error('ACTIVITY_TOKEN is required')
  process.exit(1)
}

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28'
}

async function fetchAllEvents() {
  const events = []
  // GitHub events API returns up to 10 pages of 100
  for (let page = 1; page <= 10; page++) {
    const url = `https://api.github.com/users/${USERNAME}/events?per_page=100&page=${page}`
    const res = await fetch(url, { headers })

    if (!res.ok) {
      if (res.status === 404 || res.status === 422) break
      throw new Error(`GitHub API error: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    if (data.length === 0) break

    events.push(...data)
    console.log(`  Page ${page}: ${data.length} events`)
  }

  return events
}

function summarize(events) {
  return events.map((e) => ({
    type: e.type,
    repo: e.repo?.name,
    createdAt: e.created_at
  }))
}

console.log('Fetching GitHub activity...')

const events = await fetchAllEvents()
const activity = {
  fetchedAt: new Date().toISOString(),
  username: USERNAME,
  events: summarize(events)
}

await fs.writeFile('data/activity.json', JSON.stringify(activity, null, 2))
console.log(`Wrote ${activity.events.length} events to data/activity.json`)
