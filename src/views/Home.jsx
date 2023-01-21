import React, { useState, useEffect } from 'react'
import { getPodcasts } from '../services/podcasts'
import { Link, } from "react-router-dom"
import './Home.css'

export const Home = () => {
    const [podcasts, setPodcasts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    
    useEffect(() => { getPodcasts().then(r => setPodcasts(r)) }, [])
    const handleSearch = e => setSearchTerm(e.target.value)

    const filteredPodcasts = podcasts.filter(podcast =>
        podcast.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        podcast.author.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div>
            <div className="search-box-container">
                <span className="podcast-count-text">{filteredPodcasts.length}</span>
                <input
                    className="search-box"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Filter podcasts..."
                />
            </div>
            <div>
                {filteredPodcasts.map((item, index) => (
                    <Link key={index} to={`podcast/${item.id}`}>
                        <div className="podcast-container">
                            <img src={item.img} alt={item.name} />
                            <div className="text-podcast-container">
                                <p className="podcast-name"> {item.name.toUpperCase()}</p>
                                <p className="podcast-author"> Autor: {item.author}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )

}