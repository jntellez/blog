import { useAppContext } from '../store/store'
import styled from 'styled-components'

import Header from './Header'
import Sidebar from './Sidebar'
import Banner from './Banner'
import Loading from './Loading'
import Footer from './Footer'
import Comments from './Comments'

const Main = styled.main`
    width: 65%;
    float: left;
`

const Section = styled.section`
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 30px rgb(0, 0, 0, 0.12);    
`

const Wrap = styled.div`
    width: 60%;
    min-height: 738px;
    margin: 0 auto;
`

const Layout = ({ children, title, description, status, comments, banner, page }) => {
    const store = useAppContext()
    const scroll = store.scroll

    return (
        <div>
            {banner ? <Banner title={title} description={description} /> : null }
            {page === 'home' ? <Header animation page={page} /> : <div style={{ marginBottom: '90px' }}></div>}
            <Header position={page === 'home'} />
            <Wrap position={scroll >= 340 ? true : false}>
                <Main>
                    <Section>
                        {status === 'pending' ? <Loading /> : children}
                    </Section>
                    {status === 'pending' ? <Loading /> : comments ?
                        <Section style={{ marginTop: '30px'}}>
                            <Comments comments={comments} />
                        </Section>: null}
                </Main>
                <Sidebar page={page} />
            </Wrap>
            <Footer />
        </div>
    )
}

export default Layout