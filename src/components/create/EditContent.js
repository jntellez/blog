import { useState } from 'react'
import { useAppContext } from '../../store/store'
import styled from 'styled-components'

import Code from '../Code'
import Order from './Order'

const Sub = styled.h3`
    font-family: Lato;
    font-size: 24px;
`

const Normal = styled.p`
    font-size: 18px;
    color: #555;
`

const SubInput = styled.textarea`
    width: 100%;
    border: none;
    outline: none;
    font-family: Lato;
    font-size: 24px;
    color: #444;
    font-weight: 600;
`

const CodeInput = styled.textarea`
    width: calc(100% - 30px);
    background-color: #eee;
    border-radius: 4px;
    padding: 15px;
    font-family: MononokiNF;
    border: none;
    outline: none;
    color: #444;
`

const NormalInput = styled.textarea`
    width: 100%;
    border: none;
    outline: none;
    font-size: 18px;
    font-family: OpenSans;
    color: #555;
`

const Form = styled.form`
    position: relative;
    width: 100%;
`

const EditContent = ({ item }) => {
    const [mode, setMode] = useState('input')    // input, static
    const [value, setValue] = useState(item.body)

    const order = item.order

    const store = useAppContext()

    const handleOnChange = e => setValue(e.target.value)

    const content = store.articleModel.content

    const handleOnBlur = () => {
        const temp = []
        let itemIndex
        if(!value) {
            content.forEach((el, index) => {
                if(item._id === el._id) itemIndex = index
            })
        }
        content.forEach((el, index) => {
            if(value) {
                temp.push(el)
                if(item._id === el._id) temp[index].body = value
            }
            else {
                if(item._id !== el._id) {
                    temp.push(el)
                    if(el.order > content[itemIndex].order) {
                        temp[index - 1].order -= 1
                    }
                }
            }
        })
        
        store.setArticleModel(props => ({ ...props, content: temp }))
        setMode('static')
    }

    const handleOnFocus = () => setMode('input')

    if(mode === 'input') {
        switch(item.type) {
            case 'sub': return <Form style={{ order }}>
                    <SubInput
                        autoFocus
                        value={value}
                        onChange={handleOnChange}
                        onBlur={handleOnBlur}
                    />
                    <Order order={order} />
                </Form>
            case 'normal': return <Form style={{ order }}>
                    <NormalInput
                        autoFocus
                        value={value}
                        onChange={handleOnChange}
                        onBlur={handleOnBlur}
                    />
                    <Order order={order} />
                </Form>
            case 'code': return <Form style={{ order }}>
                    <CodeInput
                        autoFocus
                        value={value}
                        onChange={handleOnChange}
                        onBlur={handleOnBlur}
                    />
                    <Order order={order} />
                </Form>
            default: return
        }
    }

    if(mode === 'static') {
        switch(item.type) {
            case 'sub': return <Sub style={{ order }} onDoubleClick={handleOnFocus}>{item.body}</Sub>
            case 'normal': return <Normal style={{ order }} onDoubleClick={handleOnFocus}>{item.body}</Normal>
            case 'code': return <Code order={order} handleOnFocus={handleOnFocus} content={item.body} />
            default: return
        }
    }
}

export default EditContent