import React, { useState } from 'react'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import { useValidation } from '../hooks/formik/formik'
import * as Yup from 'yup';
import { Avatar } from "@material-tailwind/react";
import marin from '../assets/marin.jpg'
import makima from '../assets/makima.jpg'
import tatsumaki from '../assets/tatsumaki.png'
import valkrey from '../assets/valkrey.jpg'
import power from '../assets/power.jpeg'
import waifu from '../assets/waifu.jpg'
import forger from '../assets/forger.jpg'
import bocchi from '../assets/bocchi.jpg'
import Modal from 'react-modal';
import CustomAvatar from '../components/CustomAvatar';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


const Profile = () => {

    const [activeIndex, setActiveIndex] = useState(-1);

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false); function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(4, 'Username length must be at least 4 characters')
            .max(12, 'username can be maximum 12 characters')
            .required('Username is required'),
        password: Yup.string()
            .min(6, 'Password length must be at least 6 characters')
            .max(20, 'password can be maximum 20 characters')
            .required('Password is required'),
    });

    const onSubmit = (values) => {
        console.log(values);
    };

    const {
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useValidation(
        {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit,
    );

    const avatars = [
        { anime: makima },
        { anime: waifu },
        { anime: power },
        { anime: valkrey },
        { anime: bocchi },
        { anime: forger },
        { anime: tatsumaki }
    ];
    const getActiveAvatar = () => {
        if (activeIndex >= 0 && activeIndex < avatars.length) {
            return avatars[activeIndex];
        }
        return null;
    };
    const activeAvatar = getActiveAvatar();
    // localstorage kaydedilecek user photo yolu

    return (
        <div className={`bg-blue1 h-screen flex items-center justify-center`}>
            <div>
                <div className='flex justify-center text-4xl text-white mb-5'>Profile</div>
                <div className='bg-blue3 rounded-lg p-6 border-r-8 border-b-8 border-blue4'>
                    <div className='flex flex-col justify-center items-center'>
                        <Avatar src={marin} alt="avatar" size="xxl" variant="circular" />
                        <button onClick={openModal} className='mt-3 bg-white rounded-md w-20 text-blue1'>Select</button>
                    </div>
                    <span className='text-gray-300'>Optional</span>
                    <Input
                        name="username"
                        placeholder="Update your username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.username}
                    />
                    <div className='mt-10 mb-10'>
                        <span className='text-gray-300'>Optional</span>
                        <Input
                            name="password"
                            type={"password"}
                            placeholder="Update your password"
                            value={values.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <Button text={"Save"} />
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <div className="flex ">
                    {avatars.map((avatar, index) => (
                        <CustomAvatar key={avatar.id} anime={avatar.anime} active={activeIndex === index} onClick={() => handleClick(index)} />
                    ))}
                </div>
                <div className='flex justify-center mt-10'>
                    <Button onClick={closeModal} style={{ backgroundColor: "#7286D3", color: "white" }} text={"Update"} />
                </div>
            </Modal>

        </div>
    )
}

export default Profile