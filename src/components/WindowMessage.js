import { useEffect } from 'react'
import styled from 'styled-components'
import { useAppContext } from '../store/store'

const Div = styled.div`
    position: fixed;
    z-index: 2;
    bottom: 20px;
    right: 20px;
    display: ${props => props.active ? 'flex' : 'none'};
    flex-direction: row;
    align-items: center;
    width: 500px;
    background-color: ${props => props.red ? 'rgb(210, 12, 12, 0.5)' : props.orange ? 'rgb(255, 157, 31, 0.62)' : props.green ? 'rgb(126, 190, 97, 0.6)' : 'transparent'};
    box-shadow: ${props => props.red ? '0 0 3px rgb(0, 0, 0, 0.08)' : props.orange ? '0 0 3px rgb(0, 0, 0, 0.08)' : props.green ? '0 0 3px rgb(0, 0, 0, 0.08)' : 'none'};
    color: ${props => props.red ? '#501e1e' : props.orange ? '#653000' : props.green ? '#0a2400' : 'transparent'};
    border-radius: 4px;
    padding: 15px;
    animation: ${props => props.green ? '10s' : '5s'} ease;
    animation-name: show;

    @keyframes show {
        0% {
            right: -400px;
            opacity: 0.2;
        }
        5% {
            right: 20px;
            opacity: 1;
        }
        50% {
            right: 20px;
            opacity: 1;
        }
        100% {
            right: -600px;
            opacity: 0;
        }
    }
`

const WindowMessage = () => {

    const store = useAppContext()

    const color = store.message.color
    const time = color === 'green' ? 9900 : (color === 'orange' || color === 'red') ? 5000 : 0

    useEffect(() => {
        setTimeout(() => {
            store.setMessage({ status: false, text: '', color: '' })
        }, time)
    }, [store.message.status === true])

    return (
        <Div
            active={store.message.status}
            red={store.message.color === 'red'}
            orange={store.message.color === 'orange'}
            green={store.message.color === 'green'}
        >
            {store.message.text}
        </Div>
    )
}

export default WindowMessage