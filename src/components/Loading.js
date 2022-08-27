import styled from 'styled-components'

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;  
`

const Article = styled.article`
    width: 100%;
    height: ${props => props.header ? '49px' : '170px'};
    border-radius: 4px;
    margin-bottom: ${props => props.header ? '-20px' : null};
    animation: breathing 2s ease infinite;

    @keyframes breathing {
        0% {
            background-color: #f2f2f2;
        }
        50% {
            background-color: #e7e7e7;
        }
        100% {
            background-color: #f2f2f2;
        }
    }
`

const Loading = () => {
    return (
        <Section>
            <Article header />
            <Article />
            <Article />
            <Article />
        </Section>
    )
}

export default Loading