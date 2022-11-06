import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppContext } from '../store/store'
import axios from 'axios'
import styled from 'styled-components'

import Message from './Message'
import PostComment from './PostComment'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 20px;
    border-bottom: 1px solid #eee;
`

const H2 = styled.h2`
    font-family: Lato;
    font-size: 26px;
    padding: 20px;
    border-bottom: 1px solid #eee;
`

const Form = styled.form`
    padding: 1px 20px; 
`

const Input = styled.input`
    width: 100%;
    border: 2px solid #eee;
    border-radius: 4px;
    font-size: 15px;
    font-family: OpenSans;
    padding: 6px;
    outline: none;
    color: #666;
    transition: all 250ms ease;

    &:focus {
        border: 2px solid #8083ff;
        color: #444;
    }
`

const Comment = styled.textarea`
    max-width: calc(100% - 12px);
    min-height: 120px;
    border: 2px solid #eee;
    border-radius: 4px;
    padding: 6px;
    font-size: 16px;
    font-family: OpenSans;
    outline: none;
    color: #666;
    transition: all 250ms ease;

    &:focus {
        border: 2px solid #8083ff;
        color: #444;
    }
`

const Section = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    margin: 19px 0;
`

const P = styled.p`
    font-family: OpenSans;
    color: #aaa;
    font-style: italic;
`

const Comments = ({ comments }) => {
    const [values, setValues] = useState({ userName: '', email: '', web: '', userImage: '', message: '' })

    useEffect(() => {
        if(!localStorage.getItem('user')) return
        axios.get(`${url}/getUser`, {
            headers: { Authorization: localStorage.getItem('user') }
        }).then(res => {
            const { name, lastname, email } = res.data
            const userImage = res.data.image ?? ''
            const userName = `${name} ${lastname}`
            setValues(props => ({ ...props, userName, email, userImage }))
        })
    }, [])

    const { pathname } = useLocation()

    const store = useAppContext()

    const { url } = store

    const handleOnChange = (e, field) => {
        setValues(props => ({...props, [field]: e.target.value}))
    }

    const handleOnSubmit = e => {
        e.preventDefault()

        const { userName, email, web, userImage, message } = values

        const comment = {
            _id: crypto.randomUUID(),
            userName,
            email,
            web,
            userImage,
            message,
            date: Date.now()
        }

        const id = pathname.split('/')[2]
        axios.patch(`${url}/comment/${id}`, comment)
        comments.push(comment)
        setValues({ userName: '', email: '', web: '', message: '' })
    }

    return (
        <>
            <H2>Comentarios</H2>
            {comments.length > 0 && <Container>
                {comments.map(comment => <Message image={comment.userImage} comment={comment} key={comment._id} />)}
            </Container>}
            <Form onSubmit={handleOnSubmit} id="comments">
                <Section>
                    <Input
                        value={values.userName}
                        onChange={e => handleOnChange(e, 'userName')}
                        type='text'
                        placeholder='Nombre *'
                        required
                    />
                    <Input
                        value={values.email}
                        onChange={e => handleOnChange(e, 'email')}
                        type='email'
                        placeholder='Email *'
                        required
                    />
                    <Input
                        value={values.web}
                        onChange={e => handleOnChange(e, 'web')}
                        type='text'
                        placeholder='Web'
                    />
                </Section>
                <Section style={{ flexDirection: 'column', gap: 0 }}>
                <P>Envuelve tu texto en las etiquetas &lt;CODE&gt; &lt;/CODE&gt; para darle formato de código</P>
                    <Comment
                        value={values.message}
                        onChange={e => handleOnChange(e, 'message')}
                        placeholder='Comentario *'
                        required
                    />
                </Section>
                <Section>
                    <PostComment>Enviar</PostComment>
                </Section>
            </Form>
        </>
    )
}

export default Comments