import { useState, useEffect } from 'react'
import { useAppContext } from '../store/store'
import styled from 'styled-components'

import SmallArticle from './SmallArticle'

const Title = styled.h3`
    font-family: Lato;
    font-size: 20px;
    padding: 15px;
    border-bottom: 1px solid #eee;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 25px;
`

const Recommended = () => {
    const [items, setItems] = useState([])

    const store = useAppContext()

    useEffect(() => {
        store.getRecommended()
            .then(items => setItems(items))
    }, [])

    return (
        <div>
            <Title>Destacados</Title>
            <Content>
                {items.map(item => item && <SmallArticle key={item.title} item={item} />)}
            </Content>
        </div>
    )
}

export default Recommended