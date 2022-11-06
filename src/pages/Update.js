import { useLocation } from 'react-router-dom'
import { useAppContext } from '../store/store'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Moment from 'react-moment'
import 'moment/locale/es'
import defaultImage from '../assets/img/default-image.jpg'

import Layout from '../components/Layout'
import EditContent from '../components/create/EditContent'

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
    min-height: 303px;
    flex-direction: column;
    gap: 30px;
    padding: 20px;
`

const Update = () => {
    const [title, setTitle] = useState('titulo')

    const [item, setItem] = useState({
        title: '',
        content: [],
        image: '',
        comments: { comments: [], count: 0 },
        languages: [],
    })

    const store = useAppContext()

    const { url } = store

    const { pathname } = useLocation()
    const _id = pathname.split('/')[2]

    useEffect(() => {
        store.getArticle(_id)
            .then(article => {
                const { data } = article
                const content = JSON.parse(data.content)
                const comments = JSON.parse(data.comments)
                const langs = JSON.parse(data.languages)
                const title = data.title

                if(data.image) {
                    axios.request({
                        url: `${url}/image/${data.image}`,
                        method: "GET",
                        responseType: "blob"
                    }).then(response => store.setImage(response.data !== null ? response.data : defaultImage))
                }

                setTitle(title)
                store.setTitle(title)
                
                store.setArticleModel(props => ({ ...props, ...data, content, comments, title }))
                const item = store.articleModel
                const image = item.image === null ? '' : item.image
                setItem({ ...item, image })
                store.setLanguages(props => ({ ...props, langs }))
            })
        }, [])

    useEffect(() => {
        const item = store.articleModel
        const image = item.image === null ? '' : item.image
        setItem({ ...item, image })
    }, [store.articleModel])
    
    const date = new Date().now
    
    const image = item.image.length < 400 ? item.image ? `${url}/image/${item.image}` : null : item.image

    return (
        <Layout
            page={'update'}
        >
             <Header>
                <Img src={image ? image : defaultImage} alt={item.title} />
                <div>
                    <H2>{item.title ? item.title : title}</H2>
                    <div style={{ marginTop: '6px' }}>
                        <Span>
                            <Moment format={'D MMMM YYYY'}>{date}</Moment>
                        </Span>
                        <> - </>
                        <Info href={"#comments"}><Bold>¿Es incorrecto?</Bold> Dejame un comentario</Info>
                    </div>
                </div>
            </Header>
            <Wrap>{item.content.map(item => <EditContent key={item._id} item={item} />)}</Wrap>
        </Layout>
    )
}

export default Update