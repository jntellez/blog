import styled from 'styled-components'
import { useAppContext } from '../store/store'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Div = styled.div`
    display: ${props => props.active ? 'flex' : 'none'};
    flex-direction: row;
    align-items: center;
    gap: 5px;
    width: 100%;
    margin-top: 5px;
    background-color: rgb(190, 12, 12, 0.22);
    box-shadow: 0 0 3px rgb(0, 0, 0, 0.08);
    border-radius: 4px;
    padding: 5px;
    transition: all 300ms ease;
    animation: 200ms;
    animation-name: show;

    @keyframes show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`

const Message = styled.div`
    flex-grow: 1;
    font-size: 14px;
    color: #501e1e;
`

const Cancel = styled.button`
    border: 1px solid #501e1e;
    font-size: 14px;
    padding: 4px 6px;
    background-color: transparent;
    box-shadow: 0 0 4px rgb(0, 0, 0, 0.1);
    border-radius: 4px;
    color: #501e1e;
    cursor: pointer;
`

const Delete = styled.button`
    border: 1px solid #501e1e;
    font-size: 14px;
    padding: 4px 6px;
    background-color: transparent;
    border-radius: 4px;
    color: #501e1e;
    cursor: pointer;
`

const DeleteConfirm = () => {
    const store = useAppContext()

    const navigate = useNavigate()

    const { pathname } = useLocation()
    const _id = pathname.split('/')[2]

    const handleOnClick = () => {
        axios.delete(`http://localhost:3200/api/${_id}`, {
            headers: { Authorization: localStorage.getItem('user') }
        })
            .then(response => {
                if(response.status === 204) {
                    if(store.deleteConfirm === true) store.setDeleteConfirm(false)
                    navigate('/')
                    const text = response.data ? response.data : 'El artículo se ha eliminado correctamente'
                    store.setMessage(props => ({ ...props, text, color: 'green' }))
                }
            })
    }

    return (
        <Div active={store.deleteConfirm}>
            <Message>¿Quieres eliminar este artículo?</Message>
            <Cancel onClick={() => store.setDeleteConfirm(false)}>Cancelar</Cancel>
            <Delete onClick={handleOnClick}>Eliminar</Delete>
        </Div>
    )
}

export default DeleteConfirm