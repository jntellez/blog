import { useState } from 'react'
import styled from 'styled-components'

const Button = styled.button`
    width: 28px;
    height: 28px;
    margin: 10px auto;
    border: none;
    background-color: #8083ff;
    font-family: WebSymbolsRegular;
    font-size: 12px;
    text-align: center;
    color: #fff;
    border-radius: 50px;
    cursor: pointer;
    transition: all 300ms ease;

    &:hover {
        opacity: 0.8;
    }
`

const Div = styled.div`
    display: flex;
    gap: 5px;
    width: 30%;
    margin: 0 auto;
`

const Current = styled.span`
    color: #8083ff;
    font-size: 17px;
    padding: 0 3px;
    margin: 10px 3px;
    border-bottom: 1px solid #8083ff;
    cursor: pointer;
`

const Number = styled.span`
    color: #444;
    font-size: 17px;
    margin: 10px 3px;
    padding: 0 3px;
    cursor: pointer;
`

const Pagination = ({ currentPage, setCurrentPage, dataLength }) => {
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(dataLength > 30 ? [1, 2, 3, 4] : dataLength > 20 ? [1, 2, 3] : dataLength > 10 ? [1, 2] : [1])
    const elements = 10

    if(page === pages[pages.length - 1] && page + 2 <= (dataLength / elements)) {
        setPages([page - 1, page, page + 1, page + 2])
    }

    if(page === pages[0] && pages[0] !== 1) {
        setPages([page - 2, page - 1, page, page + 1])
    }

    const prevPage = () => {
        if(currentPage > 0) {
            setCurrentPage(currentPage - elements)
            setPage(page - 1)
        }
    }
    
    const nextPage = () => {
        if(dataLength > currentPage + elements) {
            setCurrentPage(currentPage + elements)
            setPage(page + 1)
        }
    }

    const selectPage = page => {
        setCurrentPage(page * elements - elements)
        setPage(page)
    }

    return (
        <Div>
            <Button onClick={prevPage}>&lt;</Button>
            {pages.map(prev => prev < page ?
                <Number
                    onClick={() => selectPage(prev)}
                    key={crypto.randomUUID()}>{prev}
                </Number>
            : null)}
            <Current>{page}</Current>
            {pages.map(next => next > page ?
                <Number
                    onClick={() => selectPage(next)}
                    key={crypto.randomUUID()}>{next}
                </Number>
            : null)}
            <Button onClick={nextPage}>&gt;</Button>
        </Div>
    )
}

export default Pagination