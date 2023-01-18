import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { setName } from '../../redux/features/User/UserSlice'

const useUserPostData = (url) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [nickName, setNickName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const SubmitUserData = (e) => {
        e.preventDefault();
        postDataServer();
    }

    const postDataServer = async () => {
        setIsLoading(true)
        try {
            const body = {
                "name": nickName
            }
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()
            dispatch(setName(data.nickname))
            localStorage.setItem("nickname", JSON.stringify(data.nickname))
            navigate("/rooms")
            if (!response.ok) {
                throw new Error(data.message)
            }
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }
    return { nickName, setNickName, isLoading, error, SubmitUserData };

}

export default useUserPostData;