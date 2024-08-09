import {useEffect, useState} from "react";
import axios from "axios";

function Test() {
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + ";" + expires + ";path=/";
    }

    const user={
        email: "user@gmail.com",
        password:"12345678"
    }
    const [userInfo, setUserInfo] = useState()
    const getUserInfo = async () =>{
        const getUser = async ()=>{
            try {
                const jwtToken = localStorage.getItem('jwt');
                let res= await axios.get("http://localhost:8080/api/v1/auth/info",
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
                let res= await axios.post("http://localhost:8080/api/v1/auth/public/authenticate",user)
                const jwtToken = res.data
                setCookie('jwt', jwtToken, 1)
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