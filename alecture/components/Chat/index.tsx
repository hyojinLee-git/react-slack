import React,{VFC,useMemo} from "react";
import { ChatWrapper } from "./style";
import gravatar from 'gravatar'
import { IDM } from "@typings/db";
import dayjs from 'dayjs'
import regexifyString from 'regexify-string'
import { Link, useParams } from "react-router-dom";

interface Props{
    data:IDM
}

const Chat:VFC<Props>=({data})=>{
    const user=data.Sender
    const {workspace}=useParams<{workspace:string;channel:string}>()

    //\d:숫자   +는 1개 이상    ?는 0개 이상    g는 모두 찾기
    const result=useMemo(()=>regexifyString({
            input:data.content,
            pattern:/@\[.+?\]\(\d+?\)|\n]/g,
            decorator(match,index){
                const arr=match.match(/@\[(.+?)]\((\d+?)\)/);
                if(arr){
                    return(<Link key={match+index} to={`/workspace/${workspace}/dm/${arr[2]}`}>
                        @{arr[1]}
                    </Link>
                    )
                }
                return <br key={index}/>
            }
        })
    ,[data.content])
    return(
        <ChatWrapper>
            <div className="chat-img">
                <img src={gravatar.url(user.email,{s:'36px',d:'retro'})} alt={user.nickname}/>
            </div>
            <div className="chat-text">
                <div className="chat-user">
                    <b>{user.nickname}</b>
                    <span>{dayjs(data.createdAt).format('h:mm A')}</span>
                    <p>
                        {result}
                    </p>
                </div>
            </div>
        </ChatWrapper>
    )
}

export default React.memo(Chat)