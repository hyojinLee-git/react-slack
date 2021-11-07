import Modal from "@components/Modal";
import useInput from "@hooks/useInput";
import { Button, Input, Label } from "@pages/SignUp/styles";
import { IChannel, IUser } from "@typings/db";
import fetcher from "@utils/fetcher";
import axios from "axios";
import React, { FC, useCallback } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import useSWR from "swr";

interface Props{
    show:boolean;
    onCloseModal:()=>void;
    setShowCreateChannelModal:(flag:boolean)=>void

}

const CreateChannelModal:FC<Props>=({show, onCloseModal,setShowCreateChannelModal})=>{
    const [newChannel,onChangeNewChannel,setNewChannel]=useInput('')
    const {workspace,channel}=useParams<{workspace:string,channel:string}>()
    const {data:userData,error,mutate}=useSWR<IChannel[]|false>('http://localhost:3095/api/users',fetcher)
    const onCreateChannel=useCallback((e)=>{
        e.preventDefault()
        axios.post(`http://localhost:3095/api/workspaces/${workspace}/channels`,{
            name:newChannel
        },{
            withCredentials:true
        })
        .then(()=>{
            setShowCreateChannelModal(false);
            setNewChannel('')
            mutate()
        })
        .catch((error)=>{
            console.dir(error)
            toast.error(error.response?.data,{position:"bottom-center"})
        })
    },[newChannel])


    return(<Modal show={show} onCloseModal={onCloseModal}>
        <form onSubmit={onCreateChannel}>
            <Label id="channel-label">
                <span>워크스페이스 이름</span>
                <Input id="channel" value={newChannel} onChange={onChangeNewChannel} />
            </Label>
            <Button type="submit">생성하기</Button>
        </form>
    </Modal>)
}

export default CreateChannelModal

