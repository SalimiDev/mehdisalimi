import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import userImg from '../../public/assets/userImg.png';
import AdminNavbar from './AdminNavbar';
import HamburgerIcon from '../HamburgerIcon';

const AdminSidebar = ({ windowSize }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    useEffect(() => {
        if (windowSize.width >= 1024 && isNavOpen) {
            setIsNavOpen(false);
        }
    }, [windowSize, isNavOpen]);

    return (
        <div className='h-16 flex justify-between border-grayAccent-300 lg:h-screen  lg:flex-col   lg:border-r  dark:border-grayAccent-700'>
            <div className='w-1/2 flex border-grayAccent-300 space-x-1  lg:w-full  lg:flex-col lg:py-8 lg:border-b-1/2 lg:space-y-4 dark:border-grayAccent-700'>
                <Image
                    src={userImg}
                    alt='user'
                    className='w-16  p-2 ml-1 rounded-full shadow-xl border-primary-400 lg:p-0 lg:w-36 lg:mx-auto  lg:border-8  dark:border-primary-200'
                />
                <h3 className='font-poppins text-sm font-bold my-auto lg:text-3xl  lg:py-2  -sm:hidden'>Admin</h3>
            </div>

            <div
                className={`w-full top-16 px-[5px] fixed z-40 lg:relative lg:block -lg:bg-primary-200 -lg:dark:bg-primary-900 -lg:opacity-90 ${
                    !isNavOpen && 'hidden'
                }`}>
                <AdminNavbar setIsNavOpen={setIsNavOpen} />
            </div>
            <div className='flex flex-col justify-center lg:w-full'>
                <div className='flex justify-center space-x-2 '>
                    <HamburgerIcon isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;