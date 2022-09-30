import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAppContext } from '../store/store'
import { useNavigate } from 'react-router-dom'

const Input = styled.input`
    display: block;
    width: 70%;
    padding: 10px 55px 10px 12px;
    border: 1px solid transparent;
    margin: 20px auto;
    background-color: #ececec;
    border-radius: 30px;
    font-size: 16px;
    font-family: OpenSans;
    outline: none;
    color: #444;
    margin-bottom: 0;
    box-shadow: 0 0 5px rgb(0, 0, 0, 0.1) inset;
    transition: border-color 300ms ease;

    &:focus {
        border: 1px solid #8083ff;
        padding: 10px 55px 10px 12px;
    }
`

const Symbol = styled.span`
    font-family: WebSymbolsRegular;
    position: relative;
    bottom: 37%;
    left: 83%;
    padding: 10px 15px 9px 10px;
    cursor: pointer;
`

const Search = () => {
    const [value, setValue] = useState('')
    const [search, setSearch] = useState({ status: 'pending', items: [] })

    const store = useAppContext()

    const navigate = useNavigate()

    useEffect(() => {
        store.updateSearch(search.items)
        if(search.status === 'success') navigate('/search')
    }, [search])

    const handleOnChange = e => setValue(e.target.value)

    const handleOnSubmit = async e => {
        e.preventDefault()
        
        if(value) {
            const items = await store.getSearch(value)
            setSearch({ status: 'success', items })
        }
        
        if(search.status === 'success') navigate('/search')
        setValue('')
    }
    
    return (
        <form
            style={{ width: '100%', margin: '0 auto' }}
            onSubmit={handleOnSubmit}
        >
            <Input
                type="text" value={value}
                onChange={handleOnChange}
                placeholder="Buscar..."
                name="search"
            />
            <Symbol onClick={handleOnSubmit}>L</Symbol>
        </form>
    )
}

export default Search