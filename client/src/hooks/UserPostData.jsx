import {useState} from 'react'

const useUserPostData = (url) => {
    const [nickName, setNickName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error,setError] =  useState(null)

    const SubmitUserData = (e) => {
        e.preventDefault();
        postDataServer();
    }

    const postDataServer = async () => {
        setIsLoading(true)
        try{
            const body = {
                "name": nickName
            }
            const response = await fetch(url,{
                method:'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.text()
            console.log(data);
            localStorage.setItem("nickname",data)
            if (!response.ok) {
                throw new Error(data.message)
            }
        } catch(err){
            setError(err.message)
        }
        setIsLoading(false)
    }
    return {nickName,setNickName,isLoading,error,SubmitUserData};

}

export default useUserPostData;