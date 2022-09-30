import { useState } from 'react'
import styled from 'styled-components'

import Navbar from './Navbar'
import Contacts from './Contacts'
import { useAppContext } from '../store/store'

const ContainerAnimation = styled.header`
    display: ${props => props.animation ? props.position ? 'block' : 'none' : 'block'};
    width: 100%;
    position: ${props => props.animation ? 'fixed' : 'relative'};
    top: ${props => props.animation ? '-60px' : 'none'};
    top: ${props => props.position ? '0' : 'none'};
    z-index: 2;
    transition: all 200ms ease;
    animation: 300ms ease;
    animation-name: ${props => props.position ? 'showHeader' : 'none'};

    @keyframes showHeader {
        from {
            top: -60px;
        }
        to {
            top: 0;
        }
    }
`

const Container = styled.header`
    width: 100%;
    display: block;
    position: ${props => props.position ? 'relative' : 'sticky'};
    margin-bottom: 30px;
    top: 0;
    z-index: 2;
    transition: all 200ms ease;
`

const Div = styled.div`
    background-color: #fff;
    height: 60px;
    box-shadow: ${props => props.position ? '0px 0px 15px rgb(0, 0, 0, 0.08)' : null};
    position: relative;
`

const Wrap = styled.div`
    width: 60%;
    margin: 0 auto;
`

const Header = ({ page, animation, position }) => {
    const [scroll, setScroll] = useState(0)

    const store = useAppContext()

    if(page === 'home') {
        const handleOnScroll = () => {
            setScroll(document.documentElement.scrollTop)
            store.setScroll(scroll)
        }
    
        window.addEventListener('scroll', handleOnScroll)
    }

    return (
        <>
            {page === 'home' ? <ContainerAnimation
                animation={page === 'home' ? animation : false}
                position={scroll >= 340}
            >
                <Div position={scroll >= 340}>
                    <Wrap>
                        <Navbar />
                        <Contacts animation />
                    </Wrap>
                </Div>
            </ContainerAnimation>
                : <Container position={position}>
                    <Div position={!position}>
                        <Wrap>
                            <Navbar />
                            <Contacts animation />
                        </Wrap>
                    </Div>
                </Container>}
        </>
    )
}

export default Header