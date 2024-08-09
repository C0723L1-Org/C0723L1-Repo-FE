import {useEffect, useState} from "react";
import axios from "axios";

function Test() {

    const user={
        email: "user@gmail.com",
        password:"12345678"
    }
    const [userInfo, setUserInfo] = useState()
    const getUserInfo = async () =>{
        const getUser = async ()=>{
            try {
                let res= await axios.get("http://localhost:8080/api/v1/auth/info")
                await setUserInfo(prevState => res.data)
                console.log(res.data);

                // console.log(userResponse)
            } catch (e) {
                console.log(e)
            }
        }
        getUser();
    }
    useEffect(() => {
        const logIn = async ()=>{
            try {
                console.log(user)
                let res= await axios.post("http://localhost:8080/api/v1/auth/public/authenticate",user)
                console.log(res);
                // console.log(userResponse)
            } catch (e) {
                console.log(e)
            }
        }
        logIn();

    }, [])
    return(
        <>
            <button onClick={() => getUserInfo()}>Click Me</button>
        </>
    )
}
export default Test