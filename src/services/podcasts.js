export const getPodcasts = async () =>
    (await (await fetch(`https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`)).json())
        .feed.entry.map(x => ({
            id: x.id.attributes["im:id"], name: x["im:name"].label, author: x["im:artist"].label,
            img: x["im:image"][[x["im:image"].length - 1]].label, summary: x.summary.label
        }))
