import styled from 'styled-components'

const Button = styled.button`
    width: 15%;
    padding: 8px;
    font-size: 16px;
    color: #fff;
    border: none;
    border-radius: 4px;
    background-color: #8083ff;
    cursor: pointer;
`

const PostComment = ({ children }) => {
    return (
        <Button>{children}</Button>
    )
}

export default PostComment