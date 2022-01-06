
import { Header,Container } from "@pages/DirectMessage/style";
import React, { useCallback, useState } from "react";
import gravatar from 'gravatar'
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { useParams } from "react-router";
import { IDM, IUser } from "@typings/db";
import ChatBox from "@components/ChatBox";
import ChatList from "@components/ChatList";
import useInput from "@hooks/useInput";
import axios from "axios";


const DirectMessage=()=>{
    const {workspace,id}=useParams<{workspace:string,id:string}>()
    const {data:userData}=useSWR<IUser>(`/api/workspaces/${workspace}/users/${id}`,fetcher)
    const {data:myData}=useSWR<IUser>(`/api/users`,fetcher)
    const [chat, onChangeChat,setChat]=useInput('')
    const {data:chatData}=useSWR<IDM[]>(
        `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`,fetcher
    )

    const onSubmitForm=useCallback((e)=>{
        e.preventDefault()
        if(chat?.trim()){
            axios.post(`api/workspaces/${workspace}/dms/${id}/chats`,{
                content:chat,
            })
            .then(()=>{
                setChat('')
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    },[chat])


    if(!userData || !myData){
        return null;
    }
    return(
        <Container>
        <Header>
            <img src={gravatar.url(userData.email,{s:'24px',d:'retro'})} alt={userData.nickname}/>
            <span>{userData.nickname}</span>
        </Header>
        <ChatList/>
        <ChatBox onChangeChat={onChangeChat} chat={chat} onSubmitForm={onSubmitForm}/> 
        </Container>
    )
}

export default DirectMessage