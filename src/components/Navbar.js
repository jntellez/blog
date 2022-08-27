import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Li = styled.li`
    display: block;
    color: #333;
    list-style: none;
    text-decoration: none;
    line-height: 60px;
    font-size: 20px;
    transition: all 300ms ease;

    &:hover {
        background-color: #8083ff;
        color: #fff;
    }
`

const Ul = styled.ul`
    display: flex;
    margin: 0 auto;
    padding: 0;
`

const styleLink = {
    width: 'inherit',
    height: 'inherit',
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
    padding: '20px 20px',
}

const activeLink = {
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#8083ff',
    cursor: 'pointer',
    padding: '16.5px 20px 16.3px 20px',
}

const Navbar = () => {
    return (
        <nav style={{ display: 'inline-block' }}>
            <Ul>
                <Li>
                    <NavLink
                        style={({ isActive }) => isActive ? activeLink : styleLink}
                        to="/"
                    >
                        Inicio
                    </NavLink>
                </Li>
                <Li>
                    <NavLink
                        style={({ isActive }) => isActive ? activeLink : styleLink}
                        to="/articles"
                    >
                        Artículos
                    </NavLink>
                </Li>
                <Li>
                    <NavLink
                        style={({ isActive }) => isActive ? activeLink : styleLink}
                        to="/create"
                    >
                        Crear
                    </NavLink>
                </Li>
                <Li>
                    <NavLink
                        style={({ isActive }) => isActive ? activeLink : styleLink}
                        to="//"
                    >
                        Sobre mi
                    </NavLink>
                </Li>
                <Li>
                    <NavLink
                        style={({ isActive }) => isActive ? activeLink : styleLink}
                        to="//"
                    >
                        Contacto
                    </NavLink>
                </Li>
            </Ul>
        </nav>
    )
}

export default Navbar