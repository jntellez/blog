import styled from 'styled-components'
import { useAppContext } from '../store/store'

const Button = styled.button`
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 4px;
    color: #fff;
    background-color: #ff2828eb;
    font-size: 17px;
    box-shadow: 0 0 5px rgb(0, 0, 0, 0.17);
    transition: all 300ms ease;
    cursor: pointer;

    &:hover {
        box-shadow: 0 0 5px rgb(0, 0, 0, 0.17), 0 -6px 20px rgb(0, 0, 0, 0.4) inset;
    }
`

const DeleteButton = () => {

    const store = useAppContext()

    const handleOnClick = () => {
        store.setDeleteConfirm(!store.deleteConfirm)
    }

    return (
        <Button onClick={handleOnClick}>Eliminar</Button>
    )
}

export default DeleteButton