import { useRef, createRef } from 'react'
import styled from 'styled-components'
import { useAppContext } from '../store/store'

const Title = styled.h3`
    font-family: Lato;
    font-size: 20px;
    padding: 15px;
    border-bottom: 1px solid #eee;
`

const Content = styled.ul`
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-left: 40px;
    gap: 20px;
`

const Language = styled.li`
    position: relative;
    font-weight: 600;
    color: #444;
    cursor: pointer;
`

const Elements = styled.span`
    opacity: 0;
    position: absolute;
    padding-left: 10px;
    font-weight: normal;
    color: #777;
    transition: all 300ms ease;
`

const SelectLang = () => {
    const store = useAppContext()
    const langs = store.langs

    const handleHover = ref => {
        ref.current.style.left = '67%'
        ref.current.style.opacity = '1'
    }

    const handleHoverEnd = ref => {
        ref.current.style.left = '0'
        ref.current.style.opacity = '0'
    }

    const handleOnClick = lang => {
        store.SetLangArticles(lang)
    }

    const refs = []
    langs.langs.forEach((_, i) => {
        refs[i] = createRef()
    })

    return (
        <div style={{ width: '100%' }}>
            <Title>Categorías</Title>
            <Content>
                {langs.langs.map((lang, i) => (
                    <Language
                        key={lang}
                        onMouseOver={() => handleHover(refs[i])}
                        onMouseOut={() => handleHoverEnd(refs[i])}
                        onClick={() => handleOnClick(lang)}
                    >
                        {lang}
                        <Elements
                            ref={refs[i]}
                        >{langs.count[i]} {langs.count[i] === 1 ? 'Artículo' : 'Artículos'}</Elements>
                    </Language>
                ))}
            </Content>
        </div>
    )
}

export default SelectLang