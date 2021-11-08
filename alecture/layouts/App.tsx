import React,{FC} from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import loadable from '@loadable/component';

const LogIn=loadable(()=>import('@pages/LogIn'))
const SignUp=loadable(()=>import ('@pages/SignUp'))
const Workspace=loadable(()=>import ('@layouts/Workspace'))


const App:FC=()=>{
    return (
        <Switch>
            <Redirect exact path="/" to="/login"/>  {/* /로 접속하면 /login으로 접속 */}
            <Route path="/login" component={LogIn}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/workspaces/:workspace" component={Workspace}/>

        </Switch>
    )
}
export default App