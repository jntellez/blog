import styled from 'styled-components'

const Container = styled.div`
    display: block;
    background-color: #eee;
    border-radius: 4px;
    padding: 14px 15px 9px 15px;
`

const Line = styled.div`
    min-height: 28px;
    width: 100%;
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: #ccc transparent;
`

const Field = styled.pre`
    display: inline-block;
    max-width: 100%;
    font-size: 16px;
    font-family: MononokiNF;
    color: ${props => props.strings ? '#049646' : props.comment ? '#9e9e9e' : '#333'};
`

const Code = ({ content, handleOnFocus, order }) => {

    const destructure = string => {
        const result = []

        let line = []
        let temp = ''
        let newTemp = ''
        let comment = ''
        for(let i = 0; i < string.length; i++) {
            if(string[i - 1] === '/' && string[i] !== '/' && comment[1] !== '/') {
                comment = ''
            }
            if(string[i] === '/') {
                if(string[i - 1] !== '/' && comment) comment = ''
                comment += string[i]
                temp += string[i]
                if(string[i - 1] === '/') {
                    for(let c = 0; c < temp.length - 2; c++) newTemp += temp[c]
                    line.push({ type: 'plain', body: newTemp })
                    temp = ''
                    newTemp = ''
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
            else if(i === (string.length - 1) || string[i] === '\n') {
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
                code.map(line => <Line className="scrollbar" key={crypto.randomUUID()}>
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