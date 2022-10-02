import { useState, useEffect } from 'react'
import { useAppContext } from '../store/store'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Article from '../components/Article'
import Pagination from '../components/Pagination'

const H2 = styled.h2`
    font-family: Lato;
    font-size: 26px;
    padding: 20px;
    border-bottom: 1px solid #eee;
`

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 20px;
`

const Articles = () => {
    const [data, setData] = useState({ status: 'pending', items: [] })
    const [currentPage, setCurrentPage] = useState(0)

    const store = useAppContext()

    useEffect(() => {
        store.getArticles()
            .then(articles => {
                setData({ status: 'success', items: articles })
                const langs = []
                let count = []
                let items = []
                let isLang = false
                articles.forEach(article => {
                    items = JSON.parse(article.languages)
                    items.forEach(lang => {
                        if(lang) {
                            isLang = langs.findIndex(el => el === lang)
                            if(isLang < 0) {
                                langs.push(lang)
                                count.push(1)
                            }
                            if(isLang >= 0) {
                                let index = langs.findIndex(el => el === lang)
                                count[index]++
                            }
                        }
                    })
                });
                store.setLanguages({ langs, count })
            })
    }, [])
        
    useEffect(() => {  
        const newArticles = store.langArticles
        if(newArticles.length > 0) setData({ status: 'success', items: newArticles})
        setCurrentPage(0)
    }, [store.langArticles])

    const filteredArticles = () => {
        return data.items.slice(currentPage, currentPage + 10)
    }

    return (
        <Layout
            page={'articles'}
            status={data.status}
            small
        >
            <H2>Artículos</H2>
            <Wrap>
                {filteredArticles().map(item => <Article key={item._id} article={item} />)}
            </Wrap>
            
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                dataLength={data.items.length}
            />
        </Layout>
    )
}

export default Articles