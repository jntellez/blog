import { useState, useRef, createRef } from 'react'
import { useAppContext } from '../../store/store'
import styled from 'styled-components'

import Code from '../Code'

const Sub = styled.h3`
    font-family: Lato;
    font-size: 24px;
`

const Normal = styled.p`
    font-size: 18px;
    color: #555;
`

const SubInput = styled.textarea`
    border: none;
    outline: none;
    font-family: Lato;
    font-size: 24px;
    color: #444;
    font-weight: 600;
`

const CodeInput = styled.textarea`
    background-color: #eee;
    border-radius: 4px;
    padding: 14px 15px 9px 15px;
    font-family: MononokiNF;
    border: none;
    outline: none;
    color: #444;
`

const NormalInput = styled.textarea`
    border: none;
    outline: none;
    font-size: 18px;
    font-family: OpenSans;
    color: #555;
`

const EditContent = ({ item }) => {
    const [mode, setMode] = useState('input')    // input, static
    const [value, setValue] = useState(item.body)

    const store = useAppContext()

    const handleOnChange = e => setValue(e.target.value)

    const handleOnBlur = () => {
        const temp = []
        store.articleModel.content.forEach((el, index) => {
            temp.push(el)
            if(item._id === el._id) temp[index].body = value
        })
        
        store.setArticleModel(props => ({ ...props, content: temp }))
        setMode('static')
    }

    const handleOnFocus = () => setMode('input')

    if(mode === 'input') {
        switch(item.type) {
            case 'sub': return <SubInput rows="1" autoFocus value={value} onChange={handleOnChange} onBlur={handleOnBlur} />
            case 'normal': return <NormalInput autoFocus value={value} onChange={handleOnChange} onBlur={handleOnBlur} />
            case 'code': return <CodeInput autoFocus value={value} onChange={handleOnChange} onBlur={handleOnBlur} />
            default: return
        }
    }

    if(mode === 'static') {
        switch(item.type) {
            case 'sub': return <Sub onDoubleClick={handleOnFocus}>{item.body}</Sub>
            case 'normal': return <Normal onDoubleClick={handleOnFocus}>{item.body}</Normal>
            case 'code': return <Code handleOnFocus={handleOnFocus} content={item.body} />
            default: return
        }
    }
}

export default EditContent