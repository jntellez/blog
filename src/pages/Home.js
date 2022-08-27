import { useAppContext } from '../store/store'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Article from '../components/Article'

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

const Home = () => {
    const [data, setData] = useState({ status: 'pending', items: [] })

    const store = useAppContext()

    useEffect(() => {
        store.getlastArticles()
            .then(articles => setData({ status: 'success', items: articles }))
    }, [])

    return (
        <Layout
            banner
            page={'home'}
            title={'DeveloperBlog'}
            description={'Mi documentación de los lenguajes más populares'}
            status={data.status}
        >
            <H2>Últimos artículos</H2>
            <Wrap>
                {data.items.map(item => <Article key={item._id} article={item} />)}
            </Wrap>
        </Layout>
    )
}

export default Home