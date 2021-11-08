import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Input, Label } from '@pages/SignUp/styles';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useState,FC } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import useSWR from 'swr';

interface Props{
    show:boolean,
    onCloseModal:()=>void,
    setShowInviteWorkspaceModal:(flag:boolean)=>void
}

const InviteWorkspaceModal:FC<Props>=({show,setShowInviteWorkspaceModal,onCloseModal})=>{
    const {workspace}=useParams<{workspace:string}>()
    const [newMember,onChangeNewMember,setNewMember]=useInput('')
    const {data:userData,error,mutate}=useSWR<IUser>('/api/users',fetcher)

    const onInviteMember=useCallback((e)=>{
        e.preventDefault()
        if(!newMember || !newMember.trim()) return
        axios
        .post(`http:localhost:3095/api/workspaces/${workspace}/members`,{
            email:newMember,
        })
        .then(()=>{
            mutate()
            setShowInviteWorkspaceModal(false);
            setNewMember('')
        })
        .catch((error)=>{
            console.dir(error);
            toast.error(error.response?.data,{position:'bottom-center'})
        })
    },[workspace,newMember])

    return(
        <Modal show={show} onCloseModal={onCloseModal}>
            <form onSubmit={onInviteMember}>
                <Label>
                    <span>이메일</span>
                    <Input id="member" type="email" value={newMember} onChange={onChangeNewMember}/>
                </Label>
            </form>
        </Modal>
    )
}

export default InviteWorkspaceModal