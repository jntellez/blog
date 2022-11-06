import { useEffect, useState } from 'react'
import Moment from 'react-moment'
import 'moment/locale/es'
import styled from 'styled-components'
import { useAppContext } from '../store/store'

import userImage from '../assets/img/user-image.webp'
import Code from './Code'

const Div = styled.div`
    display: flex;
`

const Img = styled.img`
    border-radius: 4px;
    width: 40px;
    height: 40px;
`

const User = styled.p`
    font-family: Lato;
    font-size: 14px;
    font-weight: 600;
`

const Text = styled.p`
    font-size: 15px;
    margin-top: 4px;
`

const Container = styled.div`
    width: 100%;
    margin-left: 10px;
`

const DateSpan = styled.span`
    color: #999;
    font-weight: normal;
`

const Message = ({ comment, image }) => {
    const [message, setMessage] = useState([])

    const { url } = useAppContext()
    
    const date = new Date(comment.date)

    const destructure = string => {
        const result = []

        let text = ''
        let code = false
        for(let i = 0; i < string.length; i++) {
            if(code) {
                if(string[i] === '>' && string[i - 1] === 'E' && string[i - 2] === 'D' && string[i - 3] === 'O' && string[i - 4] === 'C' && string[i - 5] === '/' && string[i - 6] === '<') {
                    code = false
                    text += string[i]
                    const splitText = text.split('<CODE>').join('').split('</CODE>').join('')

                    result.push({ type: 'code', content: splitText })
                    text = ''
                }
                else {
                    text += string[i]
                }
            }
            else if(i === string.length - 1) {
                text += string[i]
                result.push({ type: 'text', content: text })
            }
            else if(string[i] === '<' && string[i + 1] === 'C' && string[i + 2] === 'O' && string[i + 3] === 'D' && string[i + 4] === 'E' && string[i + 5] === '>') {
                code = true
                result.push({ type: 'text', content: text })
                text = ''
                text += string[i]
            }
            else {
                text += string[i]
            }
        }

        return result
    }

    useEffect(() => {
        const message = destructure(comment.message)
        setMessage(message)
    }, [])

    const imageSrc = image ? `${url}/image/${image}` : userImage

    return (
        <Div>
            <Img src={imageSrc} alt={comment.userName} />
            <Container>
                <User>{comment.userName}<DateSpan> - <Moment fromNow>{date}</Moment></DateSpan></User>
                {message.map(el => {
                    switch(el.type) {
                        case 'text': return <Text key={crypto.randomUUID()}>{el.content}</Text>
                        case 'code': return <Code content={el.content} key={crypto.randomUUID()} />
                        default: return
                    }
                })}
            </Container>
        </Div>
    )
}

export default Message