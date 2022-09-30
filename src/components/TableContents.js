import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useAppContext } from '../store/store'

const Container = styled.div`
    width: 100%;
`

const Title = styled.h3`
    font-family: Lato;
    font-size: 20px;
    padding: 15px;
    border-bottom: 1px solid #eee;
`

const Content = styled.nav`
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 25px;
`

const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0;
`

const Li = styled.li`
    list-style: none;
    cursor: pointer;
`

const A = styled.a`
    text-decoration: none;
    color: #444;
    transition: all 300ms ease;

    &:hover {
        color: #8083ff;
    }
`

const TableContents = () => {
    const store = useAppContext()

    const contents = store.tableContent

    return (
        <Container>
            <Title>Contenido del artículo</Title>
            <Content>
                <Ul>
                    {contents.map(item => (
                        <Li key={crypto.randomUUID()}>
                            <A href={`#${item.split(' ').join('-').toLowerCase()}`}>- {item}</A>
                        </Li>
                    ))}
                </Ul>
            </Content>
        </Container>
    )
}

export default TableContents