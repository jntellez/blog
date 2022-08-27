import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const AppContext = createContext({
    last: [],
    articles: [],
    langArticles: [],
    scroll: 0,
    langs: [],
    pageRange: {},
    getlastArticles: () => {},
    getArticles: () => {},
    SetLangArticles: () => {},
    getSearch: () => {},
    updateSearch: () => {},
    getArticle: () => {},
    getRecommended: () => {},
    setOnScroll: () => {},
    setLanguages: () => {},
    setOnPageRange: () => {},
})

const Store = ({ children }) => {
    const url = 'http://localhost:3200/api'

    const [last, setLast] = useState([])
    const [articles, setArticles] = useState([])
    const [langArticles, setLangArticles] = useState([])
    const [search, setSearch] = useState([])
    const [scroll, setScroll] = useState(0)
    const [langs, setLangs] = useState({ langs: [], count: [] })
    const [pageRange, setPageRange] = useState({ min: 0, max: 3 })
    
    const getlastArticles = async () => {
        const { data } = await axios.get(`${url}/articles/last`)
        setLast(data)
        return data
    }

    const getArticles = async () => {
        const { data } = await axios.get(`${url}/articles`)
        setArticles(data)
        return data
    }

    const SetLangArticles = lang => {
        const newArticles = []
        articles.forEach((article) => {
            let isLang = 0
            JSON.parse(article.languages).forEach(el => el === lang ? isLang++ : null)
            if(isLang) newArticles.push(article)
        })

        setLangArticles(newArticles)
    }

    const getSearch = async search => {
        const { data } = await axios.get(`${url}/search/?search=${search}`)
        return data
    }

    const updateSearch = items => {
        setSearch(items)
    }

    const getArticle = async id => {
        const item = await axios.get(`${url}/article/${id}`)
        return item
    }

    const getRecommended = async () => {
        const items = await axios.get(`${url}/recommended`)
        return items.data
    }

    const setOnScroll = scroll => {
        setScroll(scroll)
    }

    const setLanguages = langs => {
        setLangs(langs)
    }
    
    const setOnPageRange = range => {
        if(range === 'next') setPageRange({ min: pageRange.min + 3, max: pageRange.max + 3 })
        if(range === 'previous') setPageRange({ min: pageRange.min + 3, max: pageRange.max + 3 })
    }

    return (
        <AppContext.Provider value={{
            last,
            articles,
            langArticles,
            search,
            scroll,
            langs,
            pageRange,
            getlastArticles,
            getArticles,
            SetLangArticles,
            getSearch,
            updateSearch,
            getArticle,
            getRecommended,
            setOnScroll,
            setLanguages,
            setOnPageRange,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default Store

export const useAppContext = () => useContext(AppContext)