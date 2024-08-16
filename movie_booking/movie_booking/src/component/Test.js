import {useEffect, useState} from "react";
import axios from "axios";
import request from "../redux/axios-config"

function Test() {
    function setCookie(name, value, minutes) {
        let expires = "";
        if (minutes) {
            const date = new Date();
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            expires = "expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + ";" + expires + ";path=/";
    }

    const user={
        email: "abc@gmail.com",
        password:"123"
    }
    const [userInfo, setUserInfo] = useState()
    const getUserInfo = async () =>{
        const getUser = async ()=>{
            try {
                const jwtToken = localStorage.getItem('jwt');
                let res= await request.get("/auth/info",
                    {
                        withCredentials: true
                    })
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
                let res= await request.post("/auth/public/authenticate",user)
                const jwtToken = res.data
                setCookie('jwt', jwtToken, 30)
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