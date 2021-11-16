
import { Header,Container } from "@pages/DirectMessage/style";
import React from "react";
import gravatar from 'gravatar'
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { useParams } from "react-router";
import { IUser } from "@typings/db";

const DirectMessage=()=>{
    const {workspace,id}=useParams<{workspace:string,id:string}>()
    const {data:userData}=useSWR<IUser>(`/api/workspaces/${workspace}/members/${id}`,fetcher)
    if(!userData){
        return null;
    }
    return(
        <Container>
        <Header>
            <img src={gravatar.url(userData.email,{s:'24px',d:'retro'})} alt={userData.nickname}/>
        </Header>
            <div>dm</div>
        </Container>
    )
}

export default DirectMessage