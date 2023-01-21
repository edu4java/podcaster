export const getPodcasts = async () => (await tryGetPodcastsCache())
        .feed.entry.map(x => ({
                id: x.id.attributes["im:id"], name: x["im:name"].label, author: x["im:artist"].label,
                img: x["im:image"][[x["im:image"].length - 1]].label, summary: x.summary.label
        }))

const tryGetPodcastsCache = async () => {
        const cache = localStorage.getItem('podcasts')
        if (cache) {
                const local = JSON.parse(cache)
                if (local.expiration > Date.now()) return local.data;
        }
        const podcasts = await fetchPodcasts()
        const expiration = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem('podcasts', JSON.stringify({ data: podcasts, expiration }));
        return podcasts
}

const fetchPodcasts = async () =>
        await (await fetch(`https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`)).json()

export const getEpisodes = async id =>
    (await (await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=podcastEpisode&limit=100`)).json())
        .results.filter((_, i) => i > 0).map(x => ({
            name: x.trackName, date: x.releaseDate, ms: x.trackTimeMillis, id: x.episodeGuid,
             desc: x.description, mp3: x.episodeUrl
        }))