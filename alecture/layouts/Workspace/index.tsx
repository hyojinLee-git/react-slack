import { AddButton, Channels, Chats, Header, LogOutButton, MenuScroll, ProfileImg, ProfileModal, RightMenu, WorkspaceButton, WorkspaceModal, WorkspaceName, Workspaces, WorkspaceWrapper } from "./style";
import fetcher from "@utils/fetcher";
import axios from "axios";
import React, { FC,useCallback, useState, VFC } from "react";
import { Redirect, Route, Switch,useParams } from "react-router";
import useSWR from "swr";
import gravatar from 'gravatar'
import loadable from '@loadable/component';
import Menu from "@components/Menu";
import { IChannel, IUser } from "@typings/db";
import { Link } from "react-router-dom";
import { Button, Input, Label } from "@pages/SignUp/styles";
import useInput from "@hooks/useInput";
import Modal from "@components/Modal";
import {toast} from 'react-toastify'
import CreateChannelModal from "@components/CreateChannelModal";
import InviteWorkspaceModal from "@components/InviteWorkspaceModal";

const Channel=loadable(()=>import ("@pages/Channel"))
const DirectMessage=loadable(()=>import ("@pages/DirectMessage"))


const Workspace:VFC=()=>{
    const {data:userData,error,mutate}=useSWR<IUser|false>('/api/users',fetcher)
    
    const [showUserMenu,setShowUserMenu]=useState(false)
    const [showCreateWorkspaceModal,setShowCreateWorkspaceModal]=useState(false)
    const [showCreateChannelModal,setShowCreateChannelModal]=useState(false)
    const [showInviteWorkspaceModal,setShowInviteWorkspaceModal]=useState(false)
    const [newWorkspace,onChangeNewWorkspace,setNewWorkspace]=useInput('')
    const [newUrl,onChangeNewUrl,setNewUrl]=useInput('')
    const [showWorkspaceModal,setShowWorkspaceModal]=useState(false)


    const {workspace}=useParams<{workspace:string}>()
    const {data:channelData}=useSWR<IChannel[]>(
        userData?`/api/workspaces/${workspace}/channels`:null,fetcher
        )
    const{data:memberData}=useSWR<IUser[]>(
            userData?`/api/workspaces/${workspace}/channels`:null,fetcher
        )
    const onLogout=useCallback(()=>{
        axios.post('/api/users/logout',null,{
            withCredentials:true
        })
        .then(()=>{
            mutate()
        })
    },[mutate])

    const onClickUserProfile=useCallback((e)=>{
        e.stopPropagation();
        setShowUserMenu((prev)=>!prev)
    },[])

    const onClickCreateWorkSpace=useCallback(()=>{
        setShowCreateWorkspaceModal(true)
    },[])

    const onSubmitWorkspace=useCallback((e)=>{
        e.preventDefault();
        if(!newWorkspace || !newWorkspace.trim()) return;   //띄어쓰기
        if(!newUrl || !newUrl.trim()) return;
        axios.post('/api/workspaces',{
            workspace:newWorkspace,
            url:newUrl
        },{
            withCredentials:true
        })
        .then((res)=>{
            console.log(res)
            mutate();
            setShowCreateWorkspaceModal(false)
            setNewWorkspace('')
            setNewUrl('')
        })
        .catch((error)=>{
            console.dir(error)
            toast.error(error.response?.data,{position:"bottom-center"})
        })
    },[newWorkspace,newUrl])
    const onCloseModal=useCallback(()=>{
        setShowCreateWorkspaceModal(false)
        setShowCreateChannelModal(false)
    },[])
    const toggleWorkspaceModal=useCallback(()=>{
        setShowWorkspaceModal((prev)=>!prev)
    },[])
    const onClickAddChannel=useCallback(()=>{
        setShowCreateChannelModal(true)
    },[])   
    

    if(!userData){
        return <Redirect to="/login"/>
    }

    return (<div>
        <Header>
            <RightMenu>
                <span onClick={onClickUserProfile}>
                    <ProfileImg src={gravatar.url(userData.nickname,{s:'28px',d:'retro'})} alt={userData.nickname} />
                    {showUserMenu && 
                        <Menu 
                            style={{right:0, top:38}} 
                            show={showUserMenu} 
                            onCloseModal={onClickUserProfile}>
                            <ProfileModal>
                                <img src={gravatar.url(userData.nickname,{s:'36px',d:'retro'})} alt={userData.nickname}/>
                                <div>
                                    <span id="profile-name">{userData.nickname}</span>
                                    <span>Active</span>
                                </div>
                            </ProfileModal>
                            <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
                        </Menu>
                    }
                </span>
            </RightMenu>
        </Header>
        <WorkspaceWrapper>
            <Workspaces>{userData?.Workspaces?.map((ws)=>{
                return (
                    <Link key={ws.id} to={`/workspaces/:workspace/${123}/channels/일반`}>
                        <WorkspaceButton>
                            {ws.name.slice(0,1).toUpperCase()}
                        </WorkspaceButton>
                    </Link>
                        )
                    })}
                <AddButton onClick={onClickCreateWorkSpace}>+</AddButton>
            </Workspaces>
            <Channels>
                <WorkspaceName onClick={toggleWorkspaceModal}>Sleact</WorkspaceName>
                <MenuScroll>
                    <Menu show={showWorkspaceModal} onCloseModal={toggleWorkspaceModal} style={{top:95,left:80}}>
                        <WorkspaceModal>
                            <h2>Sleact</h2>
                            <button onClick={onClickAddChannel}>채널 만들기</button>
                        </WorkspaceModal>
                    </Menu>
                    {channelData?.map((v)=>(<div>{v.name}</div>))}
                </MenuScroll>
            </Channels>
            <Chats>
                <Switch>
                    {/* nested route */}
                    <Route path="/workspaces/:workspace/channels/:channel" component={Channel}/>
                    <Route path="/workspaces/:workspace/dm/:id" component={DirectMessage}/>
                </Switch>
            </Chats>
        </WorkspaceWrapper>
        <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
            <form onSubmit={onSubmitWorkspace}>
                <Label id="workspace-label">
                    <span>워크스페이스 이름</span>
                    <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
                </Label>
                <Label id="workspace-url-label">
                    <span>워크스페이스 url</span>
                    <Input id="workspace-url" value={newUrl} onChange={onChangeNewUrl} />
                </Label>
                <Button type="submit">생성하기</Button>
            </form>
        </Modal>
        <CreateChannelModal 
            show={showCreateChannelModal} 
            onCloseModal={onCloseModal}
            setShowCreateChannelModal={setShowCreateChannelModal}
        />
        <InviteWorkspaceModal
            show={showInviteWorkspaceModal}
            onCloseModal={onCloseModal}
            setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}
        />
    </div>)
}

export default Workspace
