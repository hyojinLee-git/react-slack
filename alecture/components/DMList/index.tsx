import { IDM, IUser, IUserWithOnline } from "@typings/db";
import fetcher from "@utils/fetcher";
import React ,{FC, useCallback, useEffect, useState} from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import {CollapseButton} from '@components/DMList/style'
import { NavLink } from "react-router-dom";
import {MdArrowRight,MdArrowDropDown} from 'react-icons/md'
import useSocket from "@hooks/useSocket";



const DMList:FC=()=>{
    const {workspace}=useParams<{workspace:string}>()
    const {data:userData,error,mutate}=useSWR<IUser>('/api/users',fetcher)
    const{data:memberData}=useSWR<IUserWithOnline[]>(
        userData?`/api/workspaces/${workspace}/members`:null,fetcher
    )
    const [channelCollapse,setChannelCollapse]=useState(false)
    const[countList,setCountList]=useState<{[key:string]:number}>({})
    const [onlineList,setOnlineList]=useState<number[]>([])
    //socket
    const[socket]=useSocket(workspace)
    const toggleChannelCollapse=useCallback(()=>{
        setChannelCollapse((prev)=>!prev)
    },[])

    const resetCount=useCallback((id)=>()=>{
        setCountList((list)=>{
            return {
                ...list,
                [id]:0,
            }
        })
    },[])

    const onMessage=(data:IDM)=>{
        console.log('dm',data)
        setCountList((list)=>{
            return {
                ...list,
                [data.SenderId]:list[data.SenderId]?list[data.SenderId]+1:1,
            }
        })
    }

    useEffect(()=>{
        console.log('change workspace',workspace)
        setOnlineList([])
        setCountList({})
    },[workspace])

    useEffect(()=>{
        socket?.on('onlineList', (data: number[]) => {
            setOnlineList(data);
          });
          // socket?.on('dm', onMessage);
          // console.log('socket on dm', socket?.hasListeners('dm'), socket);
          return () => {
            // socket?.off('dm', onMessage);
            // console.log('socket off dm', socket?.hasListeners('dm'));
            socket?.off('onlineList');
          };
    },[socket])

    return(<>
        <h2>
            <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
                {/* <i 
                    className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
                    data-qa="channel-section-collapse"
                    aria-hidden="true"
                /> */}
                {channelCollapse? <MdArrowRight/>:<MdArrowDropDown/>}
            </CollapseButton>
            <span>Direct Messages</span>
        </h2>
        <div>
            {!channelCollapse &&
                memberData?.map((member)=>{
                    const isOnline=onlineList.includes(member.id);
                    const count=countList[member.id]||0;
                    return (
                        <NavLink 
                            key={member.id}
                            activeClassName="selected"
                            to={`/workspaces/${workspace}/dm/${member.id}`}
                            onClick={resetCount(member.id)}
                        >
                            {/* <i className={`c-icon p-channel_sidebar__presence_icon              p-channel_sidebar__presence_icon--dim_enabled c-presence ${
                                isOnline ? 'c-presence--active c-icon--presence-online' : 'c-icon--presence-offline'
                                }`}
                            /> */}
                            {isOnline?'???':'???'}
                            <span className={count>0? 'bold':undefined}>{member.nickname}</span>
                            {member.id===userData?.id && <span>(???)</span>}
                            {count>0 && <span className="count">{count}</span>}

                        </NavLink>
                    )
                })
            }
        </div>



    </>)
}

export default DMList