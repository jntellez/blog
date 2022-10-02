import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useAppContext } from '../store/store'

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
    min-height: 150px;
`

const Empty = styled.div`
    font-size: 20px;
    color: #444;
`

const Button = styled.button`
    margin: 10px auto;
    border: none;
    background-color: #8083ff;
    font-size: 14px;
    color: #fff;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 300ms ease;

    &:hover {
        opacity: 0.8;
    }
`

const Div = styled.div`
    display: flex;
    gap: 5px;
    width: 25%;
    margin: 0 auto;
`

const Search = () => {
    const [data, setData] = useState({ status: 'pending', items: [] })
    const [currentPage, setCurrentPage] = useState(0)

    const store = useAppContext()

    useEffect(() => {
        const items = store.search
        if(items.length === 0) setData(props => ({ status: 'success', items: props.items }))
        if(items.length > 0) setData({ status: 'success', items })
        setCurrentPage(0)
    }, [store.search])

    const filteredArticles = () => {
        return data.items.slice(currentPage, currentPage + 10)
    }

    return (
        <Layout status={data.status}>
            <H2>Resultados de la búsqueda</H2>
            <Wrap>
                {data.items.length === 0 && data.status === 'success' ? <Empty>No hay resultados</Empty> : filteredArticles().map(item => <Article key={item._id} article={item} />)}
            </Wrap>

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                dataLength={data.items.length}
            />
        </Layout>
    )
}

export default Search