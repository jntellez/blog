import styled from 'styled-components'

import Message from './Message'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 20px;
`

const H2 = styled.h2`
    font-family: Lato;
    font-size: 26px;
    padding: 20px;
    border-bottom: 1px solid #eee;
`

const Comments = ({ comments }) => {
    return (
        <>
            <H2>Comentarios</H2>
            <Container id="comments">
                {comments.map(comment => <Message comment={comment} key={comment._id} />)}
            </Container>
        </>
    )
}

export default Comments