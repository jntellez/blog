import styled from 'styled-components'
import { useAppContext } from '../store/store'

import Search from './Search'
import Recommended from './Recommended'
import SelectLang from './SelectLang'

const Aside = styled.aside`
    box-sizing: border-box;
    position: ${props => props.home ? props.position ? 'fixed' : 'relative' : 'fixed'};
    width: ${props => props.home ? props.position ? '19.3%' : '32%' : '19.3%'};
    right: ${props => props.home ? props.position ? '20%' : null : '20%'};
    top: ${props => props.home ? props.position ? '90px' : null : null};
    float: ${props => props.home ? props.position ? null : 'right' : null};
`

const Div = styled.div`
    display: flex;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 25px rgb(0, 0, 0, 0.08); 
    margin-bottom: 15px;
`

const Sidebar = ({ page }) => {
    const store = useAppContext()

    const scroll = store.scroll

    return (
        <Aside
            home={page === 'home'}
            position={scroll >= 340}
        >
            <Div>
                <Search />
            </Div>
            {page === 'articles' && <Div><SelectLang /></Div>}
            <Div>
                <Recommended />
            </Div>
        </Aside>
    )
}

export default Sidebar