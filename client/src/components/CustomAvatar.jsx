import React from 'react'
import { Avatar } from "@material-tailwind/react";
import Button from './common/Button';

const CustomAvatar = ({ anime, active, onClick }) => {
    return (
        <div className='mr-5 flex flex-col justify-center items-center'>
            <Avatar className={`border-4 ${active ? 'border-pink-400' : 'border-yellow-900'}`} src={anime} alt="avatar" size="xxl" variant="circular" />
            <div className='mt-5'>
                <Button onClick={onClick} style={{ width: "100px", backgroundColor: "#7286D3", color: "#fff", height: "20px" }} text={"Select"} />
            </div>
        </div>
    )
}

export default CustomAvatar