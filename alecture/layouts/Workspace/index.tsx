import { Channels, Chats, Header, MenuScroll, ProfileImg, RightMenu, WorkspaceName, Workspaces, WorkspaceWrapper } from "./style";
import fetcher from "@utils/fetcher";
import axios from "axios";
import React, { FC,useCallback } from "react";
import { Redirect, Route, Switch } from "react-router";
import useSWR from "swr";
import gravatar from 'gravatar'
import loadable from '@loadable/component';
const Channel=loadable(()=>import ("@pages/Channel"))
const DirectMessage=loadable(()=>import ("@pages/DirectMessage"))

const Workspace:FC=({children})=>{
    const {data:userData,error,mutate}=useSWR('http://localhost:3095/api/users',fetcher)
    const onLogout=useCallback(()=>{
        axios.post('http://localhost:3095/api/users/logout',null,{
            withCredentials:true
        })
        .then(()=>{
            mutate()
        })
    },[mutate])
    if(!userData){
        return <Redirect to="/login"/>
    }

    return (<div>
        <Header>
            <RightMenu>
                <span>
                    {/* <ProfileImg src={gravatar.url(userData.nickname,{s:'28px',d:'retro'})} alt="img" /> */}
                    <ProfileImg src="" alt=""/>
                </span>
            </RightMenu>
            
        </Header>

        <button onClick={onLogout}>로그아웃</button>
        <WorkspaceWrapper>
                <Workspaces>test</Workspaces>
                <Channels>
                    <WorkspaceName>Sleact</WorkspaceName>
                    <MenuScroll>
                        menu scroll
                    </MenuScroll>
                </Channels>
                <Chats>
                    <Switch>
                        {/* nested route */}
                        <Route path="/workspace/channel" component={Channel}/>
                        <Route path="/workspace/dm" component={DirectMessage}/>
                    </Switch>
                </Chats>
            </WorkspaceWrapper>
        {children}
    </div>)
}

export default Workspace
