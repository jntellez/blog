import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAppContext } from '../../store/store'
import axios from 'axios'

const Button = styled.button`
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 4px;
    background-image: linear-gradient(to right, #8083ff, #8588ff, #8b8eff, #9093ff, #9598ff, #9598ff, #9598ff, #9598ff, #9093ff, #8b8eff, #8588ff, #8083ff);
    color: #fff;
    font-size: 22px;
    font-family: Lato;
    cursor: pointer;
    transition: all 300ms ease;

    &:hover {
        opacity: 0.9;
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.15);
    }
`

const CreateButton = () => {
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
        setArticle({
            title: articleModel.title,
            content: stringContent,
            image: null,
            comments: '{"comments":[],"count":0}',
            languages: stringLanguages,
        })
    }, [store.articleModel])

    const handleOnClick = async () => {
        const response = await axios.post('http://localhost:3200/api/', article)
        if(response.status === 201) {
            const formData = new FormData()
            formData.append('file', store.image, store.image.name)
            const savedImage = await axios.post(`http://localhost:3200/api/upload/${response.data}`, formData)
            if(savedImage.status === 200 && savedImage.data) {
                navigate(`/article/${savedImage.data}`)
            }
        }
        else {
            console.log('No se ha podido guardar el articulo')
        }
    }

    return (
        <Button onClick={handleOnClick}>Crear artículo</Button>
    )
}

export default CreateButton