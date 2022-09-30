import { useState, useEffect } from 'react'
import { useAppContext } from '../../store/store'
import styled from 'styled-components'

import FileInput from './FileInput'
import LangsInput from './LangsInput'

const Title = styled.h3`
    font-family: Lato;
    font-size: 20px;
    padding: 15px;
    border-bottom: 1px solid #eee;
`

const Content = styled.form`
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
`

const Input = styled.input`
    display: block;
    width: ${props => props.langs ? '72%' : '93%'};
    padding: 10px;
    border: none;
    background-color: #ececec;
    border-radius: 4px;
    font-size: 16px;
    font-family: OpenSans;
    outline: none;
    color: #444;
    box-shadow: 0 0 5px rgb(0, 0, 0, 0.1) inset;
    transition: border-color 300ms ease;

    &:focus {
        border: 1px solid #8083ff;
        padding: 9px;
    }
`

const Details = () => {
    const [details, setDetails] = useState({ title: '', languages: [] })

    const store = useAppContext()
    
    useEffect(() => {
        const languages = store.langs.langs
        const title = store.title
        setDetails(props => ({ ...props, languages, title }))
    }, [store.langs])

    useEffect(() => {
        store.setArticleModel(props => ({
            ...props,
            title: details.title,
            languages: details.languages,
        }))
    }, [details])

    const handleOnChange = e => setDetails(props => ({ ...props, title: e.target.value }))

    const deleteItemLang = lang => {
        const newLangs = []
        details.languages.forEach(langs => {
            if(langs !== lang) newLangs.push(langs)
        })
        setDetails(props => ({ ...props, languages: newLangs }))
    }

    return (
        <div style={{ width: '100%' }}>
            <Title>Detalles del artículo</Title>
            <Content>
                <Input value={details.title} placeholder="Titulo" onChange={handleOnChange} />
                <LangsInput setLangs={setDetails} langs={details.languages} destroy={deleteItemLang} />
                <FileInput />
            </Content>
        </div>
    )
}

export default Details