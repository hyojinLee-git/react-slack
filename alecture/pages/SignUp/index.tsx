import useInput from '@hooks/useInput'
import React, { useCallback, useState } from 'react'
import axios from 'axios';
import {Form,Label,Input,Button, Header, LinkContainer,Error,Success} from './styles'
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
const SignUp=()=>{
    const {data,error,mutate} =useSWR('/api/users',fetcher);
    const [email,onChangeEmail]=useInput('')
    const [nickname,onChangeNickname]=useInput('')  //커스텀훅
    const [password, setPassword]=useState('')
    const [passwordCheck,setPasswordCheck]=useState('')
    const [missmatchError,setMissmatchError]=useState(false)
    const [signUpError,setSignUpError]=useState(false)
    const [signUpSuccess,setSignUpSuccess]=useState(false)


    const onChangePassword=useCallback((e)=>{
        setPassword(e.target.value)
        setMissmatchError(e.target.value!==passwordCheck)
    },[passwordCheck])  //외부 변수일때 써줌

    const onChangePasswordCheck=useCallback((e)=>{
        setPasswordCheck(e.target.value)
        setMissmatchError(e.target.value!==password)
    },[password])

    const onSubmit=useCallback((e)=>{
        e.preventDefault()
        if(!missmatchError){
            console.log('서버로 회원가입하기')
            setSignUpError(false)
            setSignUpSuccess(false) //요청 여러번 날아갈 때
            axios.post('/api/users',{
                email,
                nickname,
                password
            })
            .then((response)=>{
                console.log(response)
                setSignUpSuccess(true)
            })
            .catch((error)=>{
                console.log(error.response)
                setSignUpError(true)
            })
            .finally(()=>{})
        }
        //console.log(email,nickname,password,passwordCheck)
    },[email,nickname,password,passwordCheck,missmatchError])
    
    if(data){
        return <Redirect to="/workspace/channel" />
    }

    return(<div id="container">
        <Header>Sleact</Header>
        <Form onSubmit={onSubmit}>
            <Label id="email-label">
                <span>이메일 주소</span>
                <div>
                    <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail}/>
                </div>
            </Label>
            <Label id="nickname-label">
                <span>닉네임</span>
                <div>
                    <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
                </div>
            </Label>
            <Label id="password-label">
                <span>비밀번호</span>
                <div>
                    <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
                </div>
            </Label>
            <Label id="passwordCheck-label">
                <span>비밀번호 확인</span>
                <div>
                    <Input type="password" id="passwordCheck" name="passwordCheck" value={passwordCheck} onChange={onChangePasswordCheck} />
                </div>
                
            </Label>
            {missmatchError && <Error>비밀번호가 일치하지 않습니다.</Error> }
            {!nickname && <Error>닉네임을 입력해주세요.</Error>}
            {signUpError && <Error>이미 사용중인 이메일입니다.</Error>}
            {signUpSuccess && <Success>회원가입에 성공하였습니다. 로그인해주세요.</Success>}
            <Button type="submit">
                회원가입
            </Button>
        </Form>
        <LinkContainer>
            이미 회원이신가요?
            <Link to="/login">로그인 하러가기</Link>
        </LinkContainer>
    </div>)
}
export default SignUp