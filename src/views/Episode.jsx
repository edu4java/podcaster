import React, { useState, useEffect } from 'react'
import './Episode.css'
import { useParams } from "react-router-dom"
import { getPodcasts, getEpisodes } from '../services/podcasts'
import Sidebar from '../components/Sidebar'

export const Episode = () => {
  let { idPodcast, idEpisode } = useParams()
  const [podcast, setPodcast] = useState([])
  const [episode, setEpisode] = useState([])

  useEffect(() => {
    getPodcasts().then(r => { setPodcast(r.filter(p => p.id == idPodcast)[0]) })
    getEpisodes(idPodcast).then(r => { setEpisode(r.filter(e => e.id == idEpisode)[0]) })
  }, [])

  return (
    <div id="container">
      <Sidebar name={podcast.name} img={podcast.img} author={podcast.author} summary={podcast.summary} />
      <div id="main-container">
        <h4>{episode.name}</h4>
        <p className='it'> {episode.desc}</p>
        <div id="podcast-player">
          <audio src={episode.mp3} controls> </audio>
        </div>
      </div>
    </div>
  )


}