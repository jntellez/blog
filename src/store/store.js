import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const AppContext = createContext({
    last: [],
    articles: [],
    langArticles: [],
    scroll: 0,
    langs: [],
    pageRange: {},
    articleModel: {},
    image: {},
    tableContent: [],
    title: '',
    deleteConfirm: false,
    message: {},
    stateAuth: false,
    setStateAuth: () => {},
    setMessage: () => {},
    setDeleteConfirm: () => {},
    setTitle: () => {},
    setTableContent: () => {},
    setImage: () => {},
    setArticleModel: () => {},
    getlastArticles: () => {},
    getArticles: () => {},
    SetLangArticles: () => {},
    setLangArticles: () => {},
    getSearch: () => {},
    updateSearch: () => {},
    getArticle: () => {},
    getRecommended: () => {},
    setScroll: () => {},
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
    const [title, setTitle] = useState('')
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [message, setMessage] = useState({ status: false, text: '', color: '' })
    const [articleModel, setArticleModel] = useState({ 
        title: '',
        content: [],
        image: '',
        comments: { comments: [], count: 0 },
        languages: [],
    })
    const [tableContent, setTableContent] = useState([])
    const [image, setImage] = useState({})
    const setAuth = async () => {
        if(!localStorage.getItem('user')) return
        const res = await fetch('http://localhost:3200/api/checkAuth', {
            headers: {
                Authorization: localStorage.getItem('user')
            }
        })
        
        if(!res) return
        const response = await res.text()
        if(response !== 'true') return
        const responseData = JSON.parse(response)
        setStateAuth(responseData === true ? true : false)
        return true
    }

    const [stateAuth, setStateAuth] = useState(setAuth() === true ? true : false)
    
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

    const setLanguages = langs => {
        setLangs(langs)
    }
    
    return (
        <AppContext.Provider value={{
            last,
            articles,
            langArticles,
            search,
            scroll,
            langs,
            articleModel,
            image,
            tableContent,
            title,
            deleteConfirm,
            message,
            stateAuth,
            setStateAuth,
            setMessage,
            setDeleteConfirm,
            setTitle,
            setTableContent,
            setImage,
            getlastArticles,
            getArticles,
            SetLangArticles,
            setLangArticles,
            getSearch,
            updateSearch,
            getArticle,
            getRecommended,
            setScroll,
            setLanguages,
            setArticleModel,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default Store

export const useAppContext = () => useContext(AppContext)