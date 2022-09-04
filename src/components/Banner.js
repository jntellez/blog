import styled from 'styled-components'

const Div = styled.div`
    height: 280px;
    background-image: linear-gradient(to right, #8083ff, #8588ff, #8b8eff, #9093ff, #9598ff, #9598ff, #9598ff, #9598ff, #9093ff, #8b8eff, #8588ff, #8083ff);
`

const Title = styled.h1`
    text-align: center;
    font-size: 55px;
    letter-spacing: 1px;
    padding-top: 85px;
    color: #fff;
    transition: all 300ms ease;
    animation: 900ms ease;
    animation-name: initial-animation;

    @keyframes initial-animation {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`

const Description = styled.div`
    text-align: center;
    font-size: 20px;
    padding-top: 20px;
    color: #fff;
    text-transform: capitalize;
    animation: 800ms ease;
    animation-name: initial-animation;

    @keyframes initial-animation {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`

const Banner = ({ title, description }) => {
    return (
        <Div>
            <Title>{title}</Title>
            <Description>{description}</Description>
        </Div>
    )
}

export default Banner