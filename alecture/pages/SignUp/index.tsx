import React, { useState } from 'react'
import {Form,Label,Input,Button, Header} from './styles'
const SignUp=()=>{
    const [email,setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [passwordCheck,setPasswordCheck]=useState('')
    const [nickname,setNickname]=useState('')
    const onSubmit=()=>{}
    const onChangeEmail=()=>{}
    const onChangeNickname=()=>{}
    const onChangePassword=()=>{}
    const onChangePasswordCheck=()=>{}

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
        </Form>
    </div>)
}
export default SignUp