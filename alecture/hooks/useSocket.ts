import { useCallback } from 'react';
import io from 'socket.io-client'

const backURL='http://localhost:3095'

const sockets:{[key:string]:SocketIOClient.Socket}={}
const useSocket=(workspace?:string):[SocketIOClient.Socket|undefined,()=>void]=>{
    //socket disconnect
    const disconnect=useCallback(()=>{
        if(workspace){
            sockets[workspace].disconnect()
            delete sockets[workspace]
        }
    },[])

    if(!workspace) return[undefined,disconnect]

    if (!sockets[workspace]) {
        sockets[workspace] = io.connect(`${backURL}/ws-${workspace}`, {
          transports: ['websocket'],
        });
      }

    return [sockets[workspace],disconnect]
}

export default useSocket