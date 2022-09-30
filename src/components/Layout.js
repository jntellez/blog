import { useAppContext } from '../store/store'
import styled from 'styled-components'
import { useEffect } from 'react'

import Header from './Header'
import Sidebar from './Sidebar'
import Banner from './Banner'
import Loading from './Loading'
import Footer from './Footer'
import Comments from './Comments'
import WindowMessage from './WindowMessage'

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

    useEffect(() => {
        store.setLangArticles([])
    }, [])

    useEffect(() => {
        store.setMessage(props => ({ ...props, status: true }))
    }, [store.message.text.length > 0])

    if(page) {
        const handleOnScroll = () => {
            store.setScroll(document.documentElement.scrollTop)
        }
    
        window.addEventListener('scroll', handleOnScroll)
    }

    return (
        <div>
            {banner ? <Banner title={title} description={description} /> : null }
            {page === 'home' ? <Header animation page={page} /> : null}
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
                <WindowMessage />
            </Wrap>
            <Footer />
        </div>
    )
}

export default Layout