import styled from 'styled-components'
import { useRef } from 'react'

const Div = styled.div`
    position: relative;
    float: right;
`

const Item = styled.span`
    position: relative;
    display: inline-block;
    font-family: WebSymbolsRegular;
    color: ${props => props.white ? '#fff' : '#444'};
    font-size: ${props => props.twitter ? '30px' : '25px'};
    padding: ${props => props.twitter ? '4px 15px 16px 15px' : '10px 15px 18px 15px'};
    line-height: ${props => props.twitter ? '40px' : '32px'};
    cursor: pointer;
    transition: all 200ms ease;
    
    &:hover {
        opacity: ${props => props.animation ? 0 : 1};
    }
`

const Icon = styled.span`
    opacity: 0;
    position: absolute;
    font-family: WebSymbolsRegular;
    font-size: ${props => props.twitter ? '30px' : '25px'};
    bottom: 60px;
    left: ${props => props.facebook ? '130px' : props.linkedin ? '75px' : '15px'};
    color: ${props => props.facebook ? '#1771E6' : props.linkedin ? '#026EAA' : '#1C93E4'};
    transition: all 300ms ease;
`

const A = styled.a`
    color: ${props => props.white ? '#fff' : '#444'};
`

const Contacts = ({ white, animation }) => {
    const refTwitter = useRef()
    const refLinkedin = useRef()
    const refFacebook = useRef()

    const handleHover = ref => {
        if(animation) {
            ref.current.style.bottom = '18px'
            ref.current.style.opacity = '1'
        }
    }

    const handleHoverEnd = ref => {
        if(animation) {
            ref.current.style.bottom = '60px'
            ref.current.style.opacity = '0'
        }
    }

    return(
        <Div>
            {animation && <Icon twitter ref={refTwitter}>t</Icon>}
            <A white={white} href="https://twitter.com/tellezAizen">
                <Item
                    twitter
                    white={white}
                    animation={animation}
                    onMouseOver={() => handleHover(refTwitter)}
                    onMouseOut={() => handleHoverEnd(refTwitter)}
                >t</Item>
            </A>

            {animation && <Icon linkedin ref={refLinkedin}>l</Icon>}
            <A white={white} href="https://www.linkedin.com/in/juan-téllez-94b3b7230/">
                <Item
                    white={white}
                    animation={animation}
                    onMouseOver={() => handleHover(refLinkedin)}
                    onMouseOut={() => handleHoverEnd(refLinkedin)}
                >l</Item>
            </A>

            {animation && <Icon facebook ref={refFacebook}>f</Icon>}
            <A white={white} href="https://www.facebook.com/jany.tellez.14/">
                <Item
                    white={white}
                    animation={animation}
                    onMouseOver={() => handleHover(refFacebook)}
                    onMouseOut={() => handleHoverEnd(refFacebook)}
                >f</Item>
            </A>
        </Div>
    )
}

export default Contacts