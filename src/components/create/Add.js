import styled from 'styled-components'

import Button from './Button'

const Title = styled.h3`
    font-family: Lato;
    font-size: 20px;
    padding: 15px;
    border-bottom: 1px solid #eee;
`

const Content = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px;
    gap: 20px;
`

const Add = () => {
    return (
        <div style={{ width: '100%' }}>
            <Title>Crear artículo</Title>
            <Content>
                <Button action={{ type: 'paragraph' }}>Parrafo</Button>
                <Button action={{ type: 'code' }}>Codigo</Button>
                <Button action={{ type: 'subheader' }}>Subtitulo</Button>
            </Content>
        </div>
    )
}

export default Add