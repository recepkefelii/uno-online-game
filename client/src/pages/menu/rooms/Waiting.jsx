import React from 'react'
import power from '../../../assets/power.jpeg'
import { Avatar } from '@material-tailwind/react'
import Button from '../../../components/common/Button'

const Waiting = () => {
    return (
        <div className={`bg-blue1 h-screen flex items-center justify-center`}>
            <div>
                <div className='flex justify-center text-4xl text-white mb-5'>Profile</div>
                <div className='bg-blue3 rounded-lg p-6 border-r-8 border-b-8 border-blue4'>
                    <div className='mr-5 flex flex-row justify-center items-center gap-3'>
                        <div className='flex flex-col items-center'>
                            <span>Your Name</span>
                            <Avatar className={`border-4 border-yellow-900`} src={power} alt="avatar" size="xxl" variant="circular" />
                        </div>
                        <div className='flex flex-col items-center'>
                            <span>Your Name</span>
                            <Avatar className={`border-4 border-yellow-900`} src={power} alt="avatar" size="xxl" variant="circular" />
                        </div>
                        <div className='flex flex-col items-center'>
                            <span>Your Name</span>
                            <Avatar className={`border-4 border-yellow-900`} src={power} alt="avatar" size="xxl" variant="circular" />
                        </div >
                        <div className='flex flex-col items-center'>
                            <span>Your Name</span>
                            <Avatar className={`border-4 border-pink-400`} src={power} alt="avatar" size="xxl" variant="circular" />
                        </div>
                    </div>
                    <div className='flex justify-center mt-10'>
                        <Button text={"Start"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Waiting