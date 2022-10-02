import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Store from './store/store'

import Home from './pages/Home'
import Articles from './pages/Articles'
import Create from './pages/Create'
import Search from './pages/Search'
import Article from './pages/Article'
import Update from './pages/Update'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
    return (
        <Store>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/articles" element={<Articles />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/article/:id" element={<Article />} />
                    <Route path="/update/:id" element={<Update />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </BrowserRouter>
        </Store>
    )
}

export default App
