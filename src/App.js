import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Store from './store/store'
import AuthGuard from './guards/auth'

import Home from './pages/Home'
import Articles from './pages/Articles'
import Create from './pages/Create'
import Search from './pages/Search'
import Article from './pages/Article'
import Update from './pages/Update'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
    return (
        <Store>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/articles" element={<Articles />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/article/:id" element={<Article />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<AuthGuard />}>
                        <Route path="/create" element={<Create />} />
                        <Route path="/update/:id" element={<Update />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Store>
    )
}

export default App
