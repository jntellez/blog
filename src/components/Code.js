import styled from 'styled-components'

const Container = styled.div`
    display: block;
    background-color: #eee;
    border-radius: 4px;
    padding: 14px 15px 9px 15px;
`

const Line = styled.div`
    height: 28px;
`

const Field = styled.code`
    font-family: MononokiNF;
    color: ${props => props.strings ? '#049646' : props.comment ? '#9e9e9e' : '#333'};
`

const Code = ({ content, handleOnFocus, order }) => {

    const destructure = string => {
        const result = []

        let line = []
        let temp = ''
        let comment = ''
        for(let i = 0; i < string.length; i++) {
            if(string[i] === '/') {
                comment += string[i]
                if(string[i - 1] === '/' && string[i] === '/') {
                    line.push({ type: 'plain', body: temp })
                    temp = ''
                }
                else if(string[i - 1] === '/' && string[i - 2] !== '/') {
                    temp += `/${string[i]}`
                }
            }
            else if(comment[0] === '/' && comment[1] === '/') {
                if(string[i] !== '\n') comment += string[i]
                if(string[i] === '\n' || i === string.length - 1) {
                    line.push({ type: 'comment', body: comment })
                    comment = ''
                    if(string[i] === '\n' || i === string.length - 1) {
                        result.push(line)
                        line = []
                    }
                }
            }
            else if(string[i] === '\n' || i === string.length - 1) {
                if(string[i - 1] !== '"' || string[i - 1] !== "'" || string[i - 1] !== "`") {
                    temp += string[i]
                    line.push({ type: 'plain', body: temp })
                    temp = ''
                }
                else if(string[i - 1] === '"' || string[i - 1] === "'" || string[i - 1] === "`") line.push({ type: 'string', body: temp })
                result.push(line)
                line = []
            }
            else if(string[i] !== "'" && string[i] !== '"' && string[i] !== '`' && comment[0] !== '/' && comment[1] !== '/') {
                temp += string[i]
                if(i === string.length - 1) temp += string[i]
            }
            else if(string[i] === '\n') temp = ''
            else {
                if(temp[0] === "'" || temp[0] === '"' || temp[0] === '`') {
                    temp += string[i]
                    line.push({ type: 'string', body: temp })
                    temp = ''
                }
                else if(string[i] === "'" || string[i] === '"' || string[i] === '`') {
                    line.push({ type: 'plain', body: temp })
                    temp = ''
                    temp += string[i]
                }
            }
        }
        return result
    }

    const code = destructure(content)

    return (
        <Container onDoubleClick={handleOnFocus} style={{ order }}>
            {
                code.map(line => <Line key={crypto.randomUUID()}>
                    {
                        line.map(el => {
                            switch(el.type) {
                                case 'plain': return <Field key={crypto.randomUUID()}>{el.body}</Field>
                                case 'string': return <Field strings key={crypto.randomUUID()}>{el.body}</Field>
                                case 'comment': return <Field comment key={crypto.randomUUID()}>{el.body}</Field>
                                default: return <Field />
                            }
                        })
                    }
                </Line>)
            }
        </Container>
    )
}

export default Code