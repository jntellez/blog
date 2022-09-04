import { useAppContext } from '../../store/store'
import styled from 'styled-components'

const Add = styled.button`
    display: block;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    color: #fff;
    background-color: #8083ff;
    cursor: pointer;
    transition: all 300ms ease;

    &:hover {
        opacity: 0.85;
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
    }
`

const Button = ({ children, action }) => {
    const store = useAppContext()

    const addLineContent = type => {
        const temp = store.articleModel.content
        const newElement = { _id: crypto.randomUUID(), type, body: 'nuevo' }
        temp.push(newElement)
        store.setArticleModel(props => ({ ...props, content: temp }))
    }

    const handleOnClick = () => {
        switch(action.type) {
            case 'paragraph': {
                return addLineContent('normal')
            }
            case 'code': {
                return addLineContent('code')
            }
            case 'subheader': {
                return addLineContent('sub')
            }
            default: return
        }
    }

    return (
        <>
            <Add action={action} onClick={handleOnClick}>{children}</Add>
        </>
    )
}

export default Button