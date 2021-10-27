import React,{FC} from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import loadable from '@loadable/component';


const LogIn=loadable(()=>import('@pages/LogIn'))
const SignUp=loadable(()=>import ('@pages/SignUp'))
const Channel=loadable(()=>import ("@pages/Channel"))

const App:FC=()=>{
    return (
        <Switch>
            <Redirect exact path="/" to="/login"/>  {/* /로 접속하면 /login으로 접속 */}
            <Route path="/login" component={LogIn}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/workspace/channel" component={Channel}/>
        </Switch>
    )
}
export default App