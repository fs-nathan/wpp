import React, {
    useEffect,
    // useRef 
} from 'react'
import styled from 'styled-components'
import DetailMess from './DetailMessage'

const Container = styled.div`
`



const WrapChat = styled.div`
    
`


export default function BodyPart(props) {

    let chatRef = null

    useEffect(() => {
        if (chatRef) {
            chatRef.scrollTop = 700
            console.log(chatRef)
            // chatRef.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatRef])

    return (
        <Container>
            <WrapChat ref={ref => chatRef = ref}>
                <DetailMess />
                <div style={{ height: 400 }}>123123123123123</div>
                <div style={{ height: 400 }}>123123123123123</div>
                <div style={{ height: 400 }}>123123123123123</div>
                <div style={{ height: 100 }}>123123123123123</div>
            </WrapChat>
        </Container>
    )
}