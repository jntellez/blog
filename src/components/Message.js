import Moment from 'react-moment'
import 'moment/locale/es'
import styled from 'styled-components'

import userImage from '../assets/img/user-image.webp'

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
    margin-left: 10px;
`

const DateSpan = styled.span`
    color: #999;
    font-weight: normal;
`

const Message = ({ comment }) => {
    const date = new Date(comment.date)

    return (
        <Div>
            <Img src={userImage} alt={comment.userName} />
            <Container>
                <User>{comment.userName}<DateSpan> - <Moment fromNow>{date}</Moment></DateSpan></User>
                <Text>{comment.message}</Text>
            </Container>
        </Div>
    )
}

export default Message