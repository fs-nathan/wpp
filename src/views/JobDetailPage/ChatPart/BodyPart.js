import React from 'react'
import styled from 'styled-components'
import colors from '../../../helpers/colorPalette'

const Container = styled.div`
`
const WrapNotification = styled.div`
    padding: 5px 10px;
    display: flex;
    height: 20px;
    position: fixed;
    background-color: white;
    width: 100%;
`
const WrapChat = styled.div`
    
`

const NotifyText = styled.div`
    color: ${colors['black'][0]};
`

function renderNotify(props) {
    return (
        <NotifyText>09:30 22/10/2019 Gặp khách hàng để chốt hợp đồng</NotifyText>
    )
}

export default function BodyPart(props) {
    return (
        <Container>
            <WrapNotification>
                {renderNotify(props)}
            </WrapNotification>
            <WrapChat>
                <div style={{ height: 400 }}>123123123123123</div>
                <div style={{ height: 400 }}>123123123123123</div>
                <div style={{ height: 400 }}>123123123123123</div>
                <div style={{ height: 400 }}>123123123123123</div>
                <div style={{ height: 100 }}>123123123123123</div>
            </WrapChat>
        </Container>
    )
}