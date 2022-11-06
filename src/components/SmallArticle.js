import { useRef } from 'react'
import { useAppContext } from '../store/store'
import styled from 'styled-components'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import 'moment/locale/es'

const Article = styled.div`
    display: flex;
    cursor: pointer;
`

const Img = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 4px;
    margin-right: 10px;
`

const Title = styled.h4`
    color: #444;
    height: 45px;
    overflow: hidden;
    transition: all 300ms ease;
`

const Content = styled.p`
    color: #777;
`

const SmallArticle = ({ item }) => {

    const store = useAppContext()

    const { url } = store

    const makeTitle = (item) => {
        const limit = 8
        const array = item.split(' ')
        let title = []
        if(array.length <= limit + 1) return item
        if(array.length >= limit) for(let i = 0; i < limit; i++) title[i] = array[i]
        else for(let i = 0; i < array.length; i++) title[i] = array[i]
        title.join()
        title += '...'
        return title.replaceAll(',', ' ')
    }

    const refTitle = useRef()

    const handleHover = () => {
        refTitle.current.style.color = '#8083ff'
    }

    const handleHoverEnd = () => {
        refTitle.current.style.color = '#444'
    }

    const title = makeTitle(item.title)

    const image = `${url}/image/${item.image}`

    return (
        <Link to={`/article/${item._id}`} style={{ textDecoration: 'none' }}>
            <Article onMouseOver={handleHover} onMouseOut={handleHoverEnd}>
                <Img src={image} alt={item.title} />
                <div>
                    <Title ref={refTitle}>{title}</Title>
                    <Content>
                        <Moment format={'D MMMM\, YYYY'}>{item.date}</Moment>
                    </Content>
                </div>
            </Article>
        </Link>
    )
}

export default SmallArticle