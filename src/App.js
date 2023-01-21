import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, } from "react-router-dom";
import { Home } from './views/Home';
import { Podcast } from './views/Podcast';
import { Episode } from './views/Episode';

function App() {
  return (
      <Router>
      <h1>
        <Link to={`/`}>Podcaster</Link> 
      </h1>
      <hr/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="podcast/:idPodcast" element={<Podcast />} />
          <Route path="podcast/:idPodcast/episode/:idEpisode" element={<Episode />} />
        </Routes>
      </Router>
  );
}

export default App;