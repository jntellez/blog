import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { useAppContext } from "../store/store"

const Li = styled.li`
  display: block;
  color: #333;
  list-style: none;
  text-decoration: none;
  line-height: 60px;
  font-size: 20px;
  transition: all 300ms ease;
`

const Ul = styled.ul`
  display: flex;
  margin: 0 auto;
  padding: 0;
`

const StyledNavLink = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  box-sizing: border-box;
  padding: 0 20px;
  height: 100%;

  &:hover {
    background-color: #8083ff;
    color: #fff;
  }

  &.active {
    background-color: #8083ff;
    color: #fff;
  }
`

const Navbar = () => {
  const store = useAppContext();

  return (
    <nav style={{ display: "inline-block" }}>
      <Ul>
        <Li>
          <StyledNavLink to="/" exact>
            Inicio
          </StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/articles">Artículos</StyledNavLink>
        </Li>
        {store.stateAuth && (
          <Li>
            <StyledNavLink to="/create">Crear</StyledNavLink>
          </Li>
        )}
        <Li>
          <StyledNavLink to="/about">Sobre mi</StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/contact">Contacto</StyledNavLink>
        </Li>
      </Ul>
    </nav>
  )
}

export default Navbar