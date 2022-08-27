import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useAppContext } from '../store/store'

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
    min-height: 150px;
`

const Empty = styled.div`
    font-size: 20px;
    color: #444;
`

const Search = () => {
    const [data, setData] = useState({ status: 'pending', items: [] })

    const store = useAppContext()

    useEffect(() => {
        const items = store.search
        if(items.length === 0) setData(props => ({ status: 'success', items: props.items }))
        if(items.length > 0) setData({ status: 'success', items })
    }, [store.search])

    return (
        <Layout status={data.status}>
            <H2>Resultados de la búsqueda</H2>
            <Wrap>
                {data.items.length === 0 && data.status === 'success' ? <Empty>No hay resultados</Empty> : data.items.map(item => <Article key={item._id} article={item} />)}
            </Wrap>
        </Layout>
    )
}

export default Search