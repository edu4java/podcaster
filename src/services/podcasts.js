export const getPodcasts = async () =>
    (await (await fetch(`https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`)).json())
        .feed.entry.map(x => ({
            id: x.id.attributes["im:id"], name: x["im:name"].label, author: x["im:artist"].label,
            img: x["im:image"][[x["im:image"].length - 1]].label, summary: x.summary.label
        }))

export const getEpisodes = async id =>
    (await (await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=podcastEpisode&limit=100`)).json())
        .results.filter((_, i) => i > 0).map(x => ({
            name: x.trackName, date: x.releaseDate, ms: x.trackTimeMillis, id: x.episodeGuid,
             desc: x.description, mp3: x.episodeUrl
        }))