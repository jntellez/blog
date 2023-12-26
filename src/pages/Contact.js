import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppContext } from '../store/store'

import Layout from '../components/Layout'

const H2 = styled.h2`
    font-family: Lato;
    font-size: 26px;
    padding: 20px;
    border-bottom: 1px solid #eee;
`

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 20px;
`

const P = styled.p`
    color: #555;
    font-size: 17px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid transparent;
    border-radius: 4px;
    background-color: #f4f4f4;
    color: #666;
    outline: none;
    font-size: 15px;
    font-family: OpenSans;
    box-shadow: 0 0 6px rgb(0, 0, 0, 0.03) inset;
    transition: all 300ms ease;

    &:focus {
        border: 1px solid #8083ff;
        color: #444;
    }
`

const Text = styled.textarea`
    max-width: calc(100% - 20px);
    min-height: 90px;
    padding: 10px;
    border: 1px solid transparent;
    border-radius: 4px;
    background-color: #f4f4f4;
    color: #666;
    outline: none;
    font-size: 15px;
    font-family: OpenSans;
    box-shadow: 0 0 6px rgb(0, 0, 0, 0.03) inset;
    transition: all 300ms ease;

    &:focus {
        border: 1px solid #8083ff;
        color: #444;
    }
`

const Button = styled.button`
    width: 25%;
    border: none;
    border-radius: 4px;
    background-color: #8083ff;
    color: #fff;
    padding: 10px;
    font-size: 15px;
    font-family: OpenSans;
    cursor: pointer;
    transition: all 300ms ease;

    &:hover {
        opacity: 0.8;
    }
`

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 15px;
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

const Contact = () => {
    const [value, setValue] = useState({ name: '', email: '', message: '' })

    const store = useAppContext()

    const handleOnChange = ({ target }) => {
        setValue(props => ({ ...props, [target.name]: target.value }))
    }

    const handleOnSubmit = () => {
        store.setMessage(props => ({
            ...props,
            text: 'Tu correo se ha mandado correctamente',
            color: 'green'
        }))
    }

    return (
        <Layout>
            <H2>Contacto</H2>
            <Wrap>
                <P>Para contactar conmigo puedes enviarme un correo en el siguiente formulario:</P>

                <Form action="https://formsubmit.co/3be7ec5fa115906143fa7fbbefc16128" method="POST" onSubmit={handleOnSubmit}>
                    <Container>
                        <Input
                            value={value.name}
                            onChange={e => handleOnChange(e)}
                            name="name"
                            type="text"
                            placeholder="Nombre"
                            required
                        />
                        <Input
                            value={value.email}
                            onChange={e => handleOnChange(e)}
                            name="email"
                            type="email"
                            placeholder="Correo"
                            required
                        />
                    </Container>
                    <Text
                        value={value.message}
                        onChange={e => handleOnChange(e)}
                        name="message"
                        type="text"
                        placeholder="Mensaje"
                        required
                    />
                    <Button type="submit">Enviar</Button>

                    <input type="hidden" name="_next" value={`http://localhost:3000/contact`} />
                    <input type="hidden" name="_captcha" value="false" />
                </Form>

                <P>También puedes enviarme mensaje por cualquera de los siguientes medios:</P>
                <ul style={{ marginTop: '-20px' }}>
                    <Li>Twitter: <A href="#"></A></Li>
                    <Li>Linkein: <A href="https://www.linkedin.com/in/juan-t%C3%A9llez-94b3b7230/">https://www.linkedin.com/in/juan-t%C3%A9llez-94b3b7230/</A></Li>
                    <Li>Facebook: <A href="https://www.facebook.com/jany.tellez.14/">https://www.facebook.com/jany.tellez.14/</A></Li>
                </ul>
                <P>Trato de constar rápido por cualquier medio que elijas. Puedes contactarme para resolver cualquier duda que te haya surgido de alguno de mis artículos, si lo se no dudaré en ayudarte.</P>
            </Wrap>
        </Layout>
    )
}

export default Contact