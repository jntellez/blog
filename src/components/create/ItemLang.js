import { useRef } from 'react'
import styled from 'styled-components'

const Span = styled.span`
    opacity: 0;
    font-family: WebSymbolsRegular;
    font-size: 12px;
    margin-left: 8px;
    cursor: pointer;
    transition: all 100ms ease;
`

const ItemLang = ({ children, destroy }) => {
    const ref = useRef()

    const handleOnHover = () => ref.current.style.opacity = '1'

    const handleOnHoverEnd = () => ref.current.style.opacity = '0'

    const handleOnClick = e => destroy(e.target.previousSibling.data)

    return (
        <li onMouseOver={handleOnHover} onMouseOut={handleOnHoverEnd}>
            {children}
            <Span ref={ref} onClick={handleOnClick}>'</Span>
        </li>
    )
}

export default ItemLang