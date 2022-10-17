import styled from 'styled-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Container = styled.div`
    width: 20%;
    margin: 260px auto;
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
    width: calc(100% -12px);
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
`

const Change = styled.a`
    width: 100%;
    color: #8083ff;
    font-family: OpenSans;
    font-size: 15px;
    text-decoration: none;
    text-align: end;
    transition: all 150ms ease;

    &:hover {
        text-decoration: underline;
    }
`

const UserBox = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    top: 10px;
    right: 10px;
    background-color: #8083ff;
    border-radius: 4px;
`

const UserName = styled.p`
    color: #fff;
    font-family: OpenSans;
    font-size: 15px;
    text-transform: capitalize;
    padding: 17px 15px 13px 15px;
`

const LogOut = styled.span`
    font-family: WebSymbolsRegular;
    font-size: 20px;
    color: #fff;
    padding: 15px 15px 15px 9px;
    border-left: 1px solid #ddd;
    border-radius: 0 4px 4px 0;
    transition: all 300ms ease;
    cursor: pointer;

    &:hover {
        text-shadow: 0 0 1px #fff;
        background-color: #8e91ff;
        box-shadow: 4px 3px 5px rgb(0, 0, 0, 0.13) inset;
    }
`

const Login = () => {
    const [value, setValue] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [userName, setUserName] = useState('')

    const navigate = useNavigate()

    const handleOnChange = ({ target }, field) => {
        setValue(props => ({ ...props, [field]: target.value }))
    }

    const handleOnSubmit = async e => {
        e.preventDefault()

        const response = await fetch('http://localhost:3200/api/login', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json'
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
            setValue({ email: '', password: '' })
            navigate('/')
        }
    }

    axios.get('http://localhost:3200/api/getUser', {
        headers: { Authorization: localStorage.getItem('user') }
    }).then(res => {
        const { name, lastname } = res.data
        const user = `${name} ${lastname}`
        setUserName(user)
    })

    const handleOnClick = () => {
        localStorage.removeItem('user')
        navigate('/')
    }
    
    return (
        <>
            <Container>
                <Title>Login</Title>
                <Form onSubmit={handleOnSubmit}>
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
                    <Button>Login</Button>
                    {error && <Error>{error}</Error>}
                    <Div>
                        <Anchor href="/">Back to home</Anchor>
                        <Change href="/register">Sign up</Change>
                    </Div>
                </Form>
            </Container>
            {userName && <UserBox>
                <UserName>{userName}</UserName>
                <LogOut onClick={handleOnClick}>n</LogOut>
            </UserBox>}
        </>
    )
}

export default Login