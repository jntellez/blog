import styled from 'styled-components'

import Layout from '../components/Layout'

import image from '../assets/img/sobre-mi-image-comp.jpg'

const H2 = styled.h2`
    font-family: Lato;
    font-size: 26px;
    padding: 20px;
    border-bottom: 1px solid #eee;
`

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
`

const P = styled.p`
    width: 100%;
    color: #555;
    font-size: 17px;
`

const B = styled.strong`
    font-weight: 700;
    color: #555;
`

const Image = styled.img`
    position: relative;
    left: -200px;
    width: 540px;
    right: 0px;
`

const WrapImage = styled.div`
    width: 80%;
    height: 400px;
    overflow: hidden;
    border-radius: 4px;
    background-position-x: 10px;
`

const Li = styled.li`
    color: #555;
    font-size: 17px;
`

const A = styled.a`
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`

const About = () => {
    return (
        <Layout
            page={'about'}
        >
            <H2>Sobre mi</H2>
            <Wrap>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <WrapImage>
                        <Image src={image} alt="Juan Téllez" />
                    </WrapImage>
                    <Wrap style={{ width: '100%', paddingTop: 0 }}>
                        <P>
                            Hola, soy <B>Juan Téllez</B>. Bienvenido a mi blog donde publico artículos sobre desarrollo web, principalmente.
                        </P>
                        <P>Soy desarrollador web y actualmente sigo aprendiendo nuevas tecnologías a la vez que desarrollo diversos proyectos personales en los cuales aplico lo aprendido.</P>
                        <h3>El blog</h3>
                        <P>
                            Este blog es mi primer proyecto, el cual está contruido con la finalidad de tener una documentación de lo que voy aprendiendo, de esta manera si olvido algo puedo consultarlo aquí.
                            Además, al estar redactando y explicando lo que voy aprendiendo, también aplico la técnica de Feynman.
                        </P>
                    </Wrap>
                </div>
                <h3>Mis estudios y trayectoria</h3>
                <P>Desde que era muy pequeño me apasionaba todo el mundo acerca de la tecnología e informática.</P>
                <P>Tenía un ordenador de bajos recursos en el que hacia todo lo posible por optimizarlo para obtener mejor rendimiento en los videojuegos que jugaba. Cuando este se estropeaba, siempre lograba repararlo de alguna manera.</P>
                <P>No fue hasta que estaba a punto de terminar el bachillerato cuando me puse a pensar en lo que haría después, tenía claro que debía ser algo relacionado con la programación. Busque diversas alternativas y me decidí por estudiar una ingeniería en sistemas.</P>
                <P>
                    Teniendo este rumbo claro y un poco de tiempo libre, pense en adelantarme un poco comenzando a programar, fue entonces cuando investige y supe un poco de que iba este mundo de la programación.
                    Me informe sobre distintas rutas para convertirse en un desarrollador web, sobre todo el contenido que había en internet y lo fácil que era acceder a él.
                </P>
                <P>En este punto, compre los cursos que marcaba una ruta de aprendizaje y me enbarque en este largo camino del que nunca se deja de aprender.</P>
                <P>Actualmente estoy desarrollando proyectos personales para ganar experiencia con las tecnologías que he aprendido y las que estare aprendiendo para asi poder llenar un portafolio con proyectos interesantes.</P>
                <P>Para saber mas de mi puedes contactarme en:</P>
                <ul>
                    <Li>Twitter: <A href="#"></A></Li>
                    <Li>Linkein: <A href="https://www.linkedin.com/in/juan-t%C3%A9llez-94b3b7230/">https://www.linkedin.com/in/juan-t%C3%A9llez-94b3b7230/</A></Li>
                    <Li>Facebook: <A href="https://www.facebook.com/jany.tellez.14/">https://www.facebook.com/jany.tellez.14/</A></Li>
                </ul>
            </Wrap>
        </Layout>
    )
}

export default About