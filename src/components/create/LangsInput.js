import { useState } from 'react'
import styled from 'styled-components'

import ItemLang from './ItemLang'

const Input = styled.input`
    display: block;
    width: ${props => props.langs ? '72%' : '93%'};
    padding: 10px;
    border: 1px solid transparent;
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
    }
`

const Langs = styled.div`
    display: flex;
    gap: 10px;
`

const Add = styled.button`
    border-radius: 4px;
    border: none;
    background-color: #8083ff;
    padding: 5px;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
    transition: all 300ms ease;

    &:hover {
        opacity: 0.85;
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
    }
`

const Content = styled.ul`
    width: 90%;
`

const LangsInput = ({ setLangs, langs, destroy }) => {
    const [value, setValue] = useState('')
    
    const handleOnChange = e => setValue(e.target.value)

    const handleOnSubmit = e => {
        e.preventDefault()

        if(value) {
            const temp = [...langs]
            temp.push(value)
            setLangs(props => ({ ...props, languages: temp }))
            setValue('')
        }
    }

    return (
        <>
            <Langs>
                <Input langs placeholder="Lenguajes" onChange={handleOnChange} value={value} />
                <Add onClick={handleOnSubmit}>Agregar</Add>
            </Langs>
            <Content>
                {langs.map(lang => <ItemLang key={lang} destroy={destroy}>{lang}</ItemLang>)}
            </Content>
        </>
    )
}

export default LangsInput