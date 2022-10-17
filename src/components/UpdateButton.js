import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useAppContext } from '../store/store'
import axios from 'axios'

const Button = styled.button`
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 4px;
    color: #fff;
    background-color: #fd9d37eb;
    font-size: 17px;
    box-shadow: 0 0 5px rgb(0, 0, 0, 0.17);
    transition: all 300ms ease;
    cursor: pointer;

    &:hover {
        box-shadow: 0 0 5px rgb(0, 0, 0, 0.17), 0 -6px 20px rgb(0, 0, 0, 0.18) inset;
    }
`

const UpdateButton = ({ update }) => {
    const [article, setArticle] = useState({
        title: '',
        content: '',
        image: null,
        comments: '',
        languages: '',
    })

    const store = useAppContext()

    const articleModel = store.articleModel

    const navigate = useNavigate()

    useEffect(() => {
        const stringContent = JSON.stringify(articleModel.content)
        const stringLanguages = JSON.stringify(articleModel.languages)
        const stringComments = JSON.stringify(articleModel.comments)
        setArticle({
            title: articleModel.title,
            content: stringContent,
            image: null,
            comments: stringComments,
            languages: stringLanguages,
        })
    }, [store.articleModel])

    const { pathname } = useLocation()
    const _id = pathname.split('/')[2]

    const handleOnClick = !update ? () => navigate(`/update/${_id}`) : async () => {
        const response = await axios.put(`http://localhost:3200/api/${_id}`, article, {
            headers: { Authorization: localStorage.getItem('user') }
        })
        if(response.status === 204) {
            const formData = new FormData()
            formData.append('file', store.image, store.image.name ? store.image.name : article.title)
            const savedImage = await axios.post(`http://localhost:3200/api/upload/${response.data ? response.data : _id}`, formData, {
                headers: { Authorization: localStorage.getItem('user') }
            })
            if(savedImage.status === 200 && savedImage.data) {
                navigate(`/article/${savedImage.data}`)
                store.setMessage(props => ({ ...props, text: 'El artículo se actualizó correctamente', color: 'green' }))
            }
            else {
                const text = response.data ? response.data : 'Ha ocurrido un error al actualizar el artículo'
                store.setMessage(props => ({ ...props, text, color: 'red' }))
            }
        }
        else {
            store.setMessage(props => ({ ...props, text: 'Faltan datos para poder actualizar el artículo', color: 'orange' }))
        }
    }

    return (
        <Button onClick={handleOnClick}>Actualizar</Button>
    )
}

export default UpdateButton