import React, { useState, useEffect } from 'react'
import './Podcast.css'
import { Link, useParams } from "react-router-dom"
import { getPodcasts, getEpisodes } from '../services/podcasts'
import Sidebar from '../components/Sidebar'

const milliseconds2Minutes = ms => {
  let seconds = ((ms % 60000) / 1000).toFixed(0)
  return Math.floor(ms / 60000) + ":" + (seconds < 10 ? '0' : '') + seconds
}

const fromatDate = d => `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`

export const Podcast = () => {
  let { idPodcast } = useParams()
  const [podcast, setPodcast] = useState([])
  const [episodes, setEpisodes] = useState([])
  useEffect(() => {
    getPodcasts().then(r => { setPodcast(r.filter(p => p.id == idPodcast)[0]) })
    getEpisodes(idPodcast).then(r => { setEpisodes(r) })
  }, [])
  return (
    <div id="container">
      <Sidebar name={podcast.name} img={podcast.img} author={podcast.author} summary={podcast.summary} />
      <div id="main-content">
        <div id="title">
          <h1>Episodes: {episodes.length}</h1>
        </div>
        <div id="list-container">
          <table>
            <thead>
              <tr> <th>Title</th> <th>Date</th> <th>Duration</th> </tr>
            </thead>
            <tbody>
              {episodes.map((item, index) => (
                <tr key={index} >
                  <td className="td-title">
                    <Link to={`/podcast/${idPodcast}/episode/${encodeURIComponent(item.id)}`}> {item.name} </Link>
                  </td>
                  <td>{fromatDate(new Date(item.date))} </td>
                  <td>{milliseconds2Minutes(item.ms)} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

