import { useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useAppContext } from '../store/store'
import Moment from 'react-moment'
import 'moment/locale/es'

const Img = styled.img`
    width: 170px;
    height: 170px;
    border-radius: 4px;
    margin-right: 20px;
    float: left;
`

const Container = styled.article`
    position: relative;
    width: 100%;
    display: flex;
    cursor: pointer;
`

const H3 = styled.h3`
    max-height: 55px;
    overflow: hidden;
    font-family: Lato;
    font-size: 22px;
    margin-bottom: 20px;
    color: #444;
`

const P = styled.p`
    max-height: 65px;
    overflow: hidden;
    font-family: OpenSans;
    font-size: 16px;
    color: #777;
`

const Date = styled.div`
    position: absolute;
    background-color: #8083ff;
    color: #fff;
    padding: 5px 10px 5px 20px;
    border-radius: 40px 0 4px 0;
    font-size: 15px;
    bottom: 0;
    right: 0;
    transition: all 300ms ease;
`

const Article = ({ article }) => {
    const refDate = useRef()

    const store = useAppContext()

    const { url } = store
    
    const handleHover = ref => {
        ref.current.style.paddingRight = '21%'
    }

    const handleHoverEnd = ref => {
        ref.current.style.paddingRight = '20px'
    }

    const makeDescription = (item) => {
        const array = item.split(' ')
        let description = []
        if(array.length >= 17) for(let i = 0; i < 17; i++) description[i] = array[i]
        else for(let i = 0; i < array.length; i++) description[i] = array[i]
        description.join()
        description += '...'
        return description.replaceAll(',', ' ')
    }

    const content = JSON.parse(article.content)
    const body = content[1]?.body
    const description = makeDescription(body)

    const image = `${url}/image/${article.image}`

    return (
        <Container
            onMouseOver={() => handleHover(refDate)}
            onMouseOut={() => handleHoverEnd(refDate)}
        >
            <Link to={`/article/${article._id}`} style={{ textDecoration: 'none', width: '100%' }}>
                <Img src={image} alt={article.title} />
                <div>
                    <H3>{article.title}</H3>
                    <P>{description}</P>
                    <Date ref={refDate}>
                        <Moment fromNow>{article.date}</Moment>
                    </Date>
                </div>
            </Link>
        </Container>
    )
}

export default Article