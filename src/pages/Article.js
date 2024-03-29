import { useState, useEffect } from 'react'
import { useAppContext } from '../store/store'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import Moment from 'react-moment'
import 'moment/locale/es'
import defaultImage from '../assets/img/default-image.jpg'

import Layout from '../components/Layout'
import Code from '../components/Code'

const Header = styled.div`
    display: flex;
    padding: 20px;
    border-radius: 4px 4px 0 0;
    background-image: linear-gradient(to right, #8083ff, #8588ff, #8b8eff, #9093ff, #9598ff, #9598ff, #9598ff, #9598ff, #9093ff, #8b8eff, #8588ff, #8083ff);
    color: #fff;
`

const H2 = styled.h2`
    font-family: Lato;
    font-size: 26px;
`

const Img = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 4px;
    box-shadow: 0 0 5px rgb(0, 0, 0, 0.3);
    margin-right: 20px;
`

const Span = styled.span`
    font-size: 14px;
`

const Info = styled.a`
    font-size: 13px;
    color: #fff;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`

const Bold = styled.b`
    font-weight: 600;
`

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 20px;
`

const Sub = styled.h3`
    font-family: Lato;
    font-size: 24px;
`

const Normal = styled.p`
    font-size: 17px;
    color: #555;
`

const Article = () => {
    const { pathname } = useLocation()
    const _id = pathname.split('/')[2]
    
    const [item, setItem] = useState({
        _id,
        title: '',
        content: [],
        date: '',
        image: '',
        comments: {
            comments: [
                {
                    _id: '',
                    userName: '',
                    email: '',
                    web: '',
                    message: '',
                    date: ''
                },
            ],
            count: 0
        }
    })

    const [contents, setContents] = useState([])
    
    const store = useAppContext()

    const { url } = store
    
    useEffect(() => {
        store.getArticle(_id)
            .then(article => {
                const { data } = article
                const content = JSON.parse(data.content)
                const comments = JSON.parse(data.comments)
                setItem({ ...data, content, comments })
            })
        }, [_id])

    useEffect(() => {
        const temp = []
        item.content.forEach(item => {
            if(item.type === 'sub') {
                temp.push(item.body)
            }
            setContents(temp)
        })
        store.setTableContent(contents)
    }, [item, store.articles, contents.length === 0])

    const date = new Date(item.date)
        
    const image = item.image ? `${url}/image/${item.image}` : defaultImage

    return (
        <Layout
            page={'article'}
            comments={item.comments.comments}
        >
            <Header>
                <Img src={image} alt={item.title} />
                <div>
                    <H2>{item.title}</H2>
                    <div style={{ marginTop: '6px' }}>
                        <Span>
                            <Moment format={'D MMMM YYYY'}>{date}</Moment>
                        </Span>
                        <> - </>
                        <Info href={"#comments"}><Bold>¿Es incorrecto?</Bold> Dejame un comentario</Info>
                    </div>
                </div>
            </Header>
            <Wrap>{item.content.map(item => {
                switch(item.type) {
                    case 'sub': {
                        const id = item.body.split(' ').join('-').toLowerCase()
                        return <Sub style={{ order: item.order }} id={id} key={crypto.randomUUID()}>{item.body}</Sub>
                    }
                    case 'normal': return <Normal style={{ order: item.order }} key={crypto.randomUUID()}>{item.body}</Normal>
                    case 'code': return <Code order={item.order} content={item.body} key={crypto.randomUUID()} />
                    default: return <Code />
                }
            })}</Wrap>
        </Layout>
    )
}

export default Article