import styled from 'styled-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    width: 20%;
    margin: 220px auto;
    background-color: #fff;
    box-shadow: 0 0 20px rgb(0, 0, 0, 0.1);
    border-radius: 4px;
`

const Title = styled.h2`
    padding: 20px;
    font-family: Lato;
    font-size: 24px;
    border-bottom: 1px solid #eee;
    border-radius: 4px 4px 0 0;
    background-color: #8083ff;
    color: #fff;
`

const Anchor = styled.a`
    width: 100%;
    color: #ababab;
    font-family: OpenSans;
    font-size: 15px;
    text-decoration: none;
    transition: all 150ms ease;

    &:hover {
        text-decoration: underline;
        color: #8083ff;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
`

const Input = styled.input`
    width: ${({ small }) => small ? '50%' : 'calc(100% -12px)'};
    border: 2px solid #eee;
    border-radius: 4px;
    padding: 6px;
    font-size: 16px;
    outline: none;
    color: #888;
    transition: all 250ms ease;

    &:focus {
        border: 2px solid #8083ff;
        color: #666;
    }

`

const Error = styled.p`
    color: #ff2828eb;
    font-family: OpenSans;
    font-size: 14px;
    margin: -8px 0;
`

const Button = styled.button`
    border: none;
    border-radius: 4px;
    background-color: #8083ff;
    color: #fff;
    padding: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: all 250ms ease;

    &:hover {
        opacity: 0.8;
    }
`

const Div = styled.div`
    display: flex;
    gap: ${props => props.two ? '15px' : null};
`

const Change = styled.a`
    width: 100%;
    color: #8083ff;
    font-family: OpenSans;
    font-size: 15px;
    text-align: end;
    text-decoration: none;
    transition: all 150ms ease;

    &:hover {
        text-decoration: underline;
    }
`

const Register = () => {
    const [value, setValue] = useState({ name: '', lastname: '', email: '', password: '' })
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleOnChange = ({ target }, field) => {
        setValue(props => ({ ...props, [field]: target.value }))
    }

    const handleOnSubmit = async e => {
        e.preventDefault()

        const response = await fetch('http://localhost:3200/api/register', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('user')
            }
        })

        const responseData = await response.text()
        if(response.status >= 300) {
            setError(responseData)
        }
        else {
            setError('')
            if(!localStorage.getItem('user')) {
                localStorage.setItem('user', `Bearer ${responseData}`)
            }
            setValue({ name: '', lastname: '', email: '', password: '' })
            navigate('/')
        }

    }
    
    return (
        <Container>
            <Title>Register</Title>
            <Form onSubmit={handleOnSubmit}>
                <Div two>
                    <Input
                        value={value.name}
                        onChange={e => handleOnChange(e, 'name')}
                        placeholder="Name"
                        small
                    />
                    <Input
                        value={value.lastname}
                        onChange={e => handleOnChange(e, 'lastname')}
                        placeholder="Lastname"
                        small
                    />
                </Div>
                <Input
                    value={value.email}
                    onChange={e => handleOnChange(e, 'email')}
                    placeholder="Email"
                />
                <Input
                    value={value.password}
                    onChange={e => handleOnChange(e, 'password')}
                    placeholder="Password"
                />
                <Button>Sign up</Button>
                {error && <Error>{error}</Error>}
                <Div>
                    <Anchor href="/">Back to home</Anchor>
                    <Change href="/login">Login</Change>
                </Div>
            </Form>
        </Container>
    )
}

export default Register