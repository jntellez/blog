import styled from 'styled-components'

import Contacts from './Contacts'

const FooterStyle = styled.footer`
    position: relative;
    box-sizing: border-box;
    width: 100%;
    min-height: 60px;
    background-image: linear-gradient(to right, #8083ff, #8588ff, #8b8eff, #9093ff, #9598ff, #9598ff, #9598ff, #9598ff, #9093ff, #8b8eff, #8588ff, #8083ff);
    color: #fff;
    margin-top: 50px;
    padding: 8px;
    bottom: 0;
    left: 0;
`

const ClearFix = styled.div`
    float: none;
    clear: both;
`

const Text = styled.div`
    display: inline-block;
    font-size: 18px;

`

const Wrap = styled.div`
    width: 60%;
    margin: 0 auto;
    line-height: 60px;
`

const Footer = () => {
    return (
        <>
            <ClearFix />
            <FooterStyle>
                <Wrap>
                    <Text>&copy; Juan Tellez - 2022</Text>
                    <Contacts white />
                </Wrap>
            </FooterStyle>
        </>
    )
}

export default Footer