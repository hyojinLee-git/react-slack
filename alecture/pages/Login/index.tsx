import { Header,Form,Label,Input,Button,LinkContainer,Error } from '@pages/SignUp/styles'
import { Link, Redirect } from 'react-router-dom'
import React, { useCallback, useState } from 'react'
import useInput from '@hooks/useInput'
import axios from 'axios'
import useSWR from 'swr'
import fetcher from '@utils/fetcher'

const LogIn=()=>{
    const {data,error,mutate} =useSWR('http://localhost:3095/api/users',fetcher);
    const [email,onChangeEmail,setEmail]=useInput('')
    const [password,onChangePassword,setPassword]=useInput('')
    const [loginError,setLoginError]=useState(false)
    const onSubmit=useCallback((e)=>{
        e.preventDefault()
        setLoginError(false)
        axios.post('http://localhost:3095/api/users/login',{
            email,
            password
        },{
            withCredentials:true
        })
        .then((response)=>{
            console.log(response)
            mutate()
        })
        .catch((error)=>{
            console.log(error.response)
            setLoginError(true)
            setEmail('')
            setPassword('')
        })
    },[email,password,mutate])

    if(data===undefined){
        return <div>로딩중...</div>
    }

    if(data){
        return <Redirect to="/workspace/channel" />
    }

    return(<div>
        <Header>Sleact</Header>
        <Form onSubmit={onSubmit}>
            <Label id="email-label">
                <span>이메일 주소</span>
                <div>
                    <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail}/>
                </div>
            </Label>
            <Label id="password-label">
                <span>비밀번호</span>
                <div>
                    <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
                </div>
            </Label>
            {loginError&& <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
            <Button type="submit">
                로그인
            </Button>
        </Form>
        
        <LinkContainer>
            아직 회원이 아니신가요?
            <Link to="/signup">회원가입 하러가기</Link>
        </LinkContainer>
</div>    )
}
export default LogIn