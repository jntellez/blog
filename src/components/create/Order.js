import { useState } from 'react'
import { useAppContext } from '../../store/store'
import styled from 'styled-components'

const UpButton = styled.button`
    width: 20px;
    font-family: WebSymbolsRegular;
    border: none;
    border-radius: 4px;
    background-color: #8083ff;
    color: #fff;
    cursor: pointer;
`

const DownButton = styled.button`
    width: 20px;
    font-family: WebSymbolsRegular;
    border: none;
    border-radius: 4px;
    background-color: #8083ff;
    color: #fff;
    cursor: pointer;
`

const Number = styled.span`
    text-align: center;
`

const Container = styled.div`
    position: absolute;
    right: 15px;
    top: 10px;
    display: flex;
    flex-direction: column;
    z-index: 2;
`

const Order = ({ order }) => {
    const store = useAppContext()

    const content = store.articleModel.content

    const up = () => {
        const temp = []
        let itemIndex = false
        content.forEach((item, index) => {
            temp.push(item)
            if(item.order === order) {
                content.forEach((el, i) => {
                    if(el.order === item.order - 1) itemIndex = i
                })
                temp[index].order = order - 1
            }
        })
        temp[itemIndex].order = order
        store.setArticleModel(props => ({ ...props, content: temp }))
    }

    const down = () => {
        const temp = []
        let itemIndex = false
        content.forEach((item, index) => {
            temp.push(item)
            if(item.order === order) {
                content.forEach((el, i) => {
                    if(el.order === item.order + 1) itemIndex = i
                })
                temp[index].order = order + 1
            }
        })
        temp[itemIndex].order = order
        store.setArticleModel(props => ({ ...props, content: temp }))
    }

    return (
        <Container>
            <UpButton onMouseDown={up}>&#125;</UpButton>
            <Number>{order}</Number>
            <DownButton onMouseDown={down}>&#123;</DownButton>
        </Container>
    )
}

export default Order