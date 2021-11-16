import { IChannel, IUser } from "@typings/db";
import fetcher from "@utils/fetcher";
import React,{FC, useCallback, useState} from "react";
import { useLocation, useParams } from "react-router";
import useSWR from "swr";


const ChannelList:FC=()=>{
    const {workspace}=useParams<{workspace?:string}>()
    const location=useLocation();
    const [channelCollapse,setChannelCollapse]=useState(false);
    const [countList,setCountList]=useState<{[key:string]:number}>({})
    const {data:userData,error,mutate}=useSWR<IUser|false>('/api/users',fetcher)
    const {data:channelData}=useSWR<IChannel[]>(
        userData?`/api/workspaces/${workspace}/channels`:null,fetcher
        )

    const toggleChannelCollapse=useCallback(()=>{
        setChannelCollapse((prev)=>!prev)
    },[])

    const resetCount=useCallback(
        (id)=>()=>{
            setCountList((list)=>{
                return {
                    ...list,
                    [id]:undefined
                }
            })
        }
    ,[])


    return(
        <div>channel</div>
    )
}
export default ChannelList