import React, { useEffect, useState } from "react"

const useUserControl = () => {
    const [user, setUser] = useState("")

    useEffect(() => {
        const getUser = () => {
            setUser(localStorage.getItem("nickname"))
        }
        getUser()
    })
    return {user}
}

export default useUserControl;
