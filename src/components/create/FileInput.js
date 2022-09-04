import { useState } from 'react'
import { useAppContext } from '../../store/store'
import styled from 'styled-components'

const SelectFile = styled.input`
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
`

const Label = styled.label`
    display: block;
    width: 40%;
    text-align: center;
    border-radius: 4px;
    border: none;
    background-color: #8083ff;
    padding: 5px;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
    transition: all 300ms ease;

    &:hover {
        opacity: 0.85;
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
    }
`

const Content = styled.div`
    display: flex;
`

const TextContent = styled.div`
    padding: 5px;
    margin-left: 5px;
`

const ImageContent = styled.img`
    width: 30%;
    height: 30%;
    border-radius: 4px;
`

const FileInput = () => {
    const [value, setValue] = useState({ fileName: '', image: '' })

    const store = useAppContext()

    const handleOnChange = e => {
        const fileName = e.target.value.split('\\')[2]
        const file = e.target.files[0]
        store.setImage(file)
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setValue({ fileName, image: reader.result })
            store.setArticleModel(props => ({ ...props, image: reader.result }))
        }     
    }

    return (
        <>
            <Content>
                <Label htmlFor="select-file">Subir imagen</Label>
                <SelectFile id="select-file" type={'file'} onChange={handleOnChange} />
                <TextContent>{value.fileName}</TextContent>
            </Content>
            <ImageContent src={value.image} />
        </>
    )
}

export default FileInput