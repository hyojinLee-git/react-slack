import ChatBox from "@components/ChatBox";
import ChatList from "@components/ChatList";
import useInput from "@hooks/useInput";
import React, { useCallback, useContext, useState } from "react";
import { Container,Header } from "./style";

const Channel=()=>{
    const [chat,onChangeChat,setChat]=useInput('');
    const onSubmitForm=useCallback((e)=>{
        e.preventDefault()
    },[])
    return <Container>
        <Header>
            채널
        </Header>
        <ChatList/>
        <ChatBox onChangeChat={onChangeChat} chat={chat} onSubmitForm={onSubmitForm}/>
    </Container>

}
export default Channel