import fetcher from "@utils/fetcher";
import axios from "axios";
import React, { FC,useCallback } from "react";
import { Redirect } from "react-router";
import useSWR from "swr";

const Workspace:FC=({children})=>{
    const {data,error,mutate}=useSWR('http://localhost:3095/api/users',fetcher)
    const onLogout=useCallback(()=>{
        axios.post('http://localhost:3095/api/users/logout',null,{
            withCredentials:true
        })
        .then(()=>{
            mutate()
        })
    },[mutate])

    if(!data){
        return <Redirect to="/login"/>
    }

    return (<div>
        워크스페이스
        <button onClick={onLogout}>로그아웃</button>
        {children}
    </div>)
}

export default Workspace
