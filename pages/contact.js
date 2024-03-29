import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import { TfiLocationPin, TfiEmail } from 'react-icons/tfi';
import { IoCallOutline } from 'react-icons/io5';
import { FaWhatsapp } from 'react-icons/fa';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';

import emailjs from '@emailjs/browser';
import { ThreeDots } from 'react-loading-icons';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('../components/Map'), {
    ssr: false,
});

const Contact = () => {
    const [sendingStatus, setSendingStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const validationSchema = yup
        .object({
            name: yup.string().required('Name is required.'),
            email: yup.string().email('Please enter a valid email address.').required('Email is required.'),
            message: yup.string().required('Message is required.'),
        })
        .required();

    //react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    //handle submiting form to sending message
    const form = useRef();
    const EMAIL_SERVICE = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID;
    const EMAIL_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID;
    const EMAIL_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY;

    const STATUS_CLEAR_TIME = 5000;

    const onSubmit = e => {
        setLoading(true);
        emailjs.sendForm(EMAIL_SERVICE, EMAIL_TEMPLATE_ID, form.current, EMAIL_PUBLIC_KEY).then(
            result => {
                setLoading(false);
                setSendingStatus('Message sent successfully.');
            },
            error => {
                setLoading(false);
                setSendingStatus('Oops,somthing went wrong.');
            },
        );
    };

    //clear sending status value
    useEffect(() => {
        setTimeout(() => setSendingStatus(''), STATUS_CLEAR_TIME);
    }, [sendingStatus]);

    const errorEffect = {
        initial: { x: 300, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -300, opacity: 0 },
    };

    const errorStyle = 'text-red-600 text-sm';
    const inputStyle =
        'w-full p-1 border-none bg-primary-100 dark:bg-primary-200 focus:outline-none focus:shadow-inner focus:shadow-gray-300 xl:py-2';

    return (
        <div className='w-full px-4 space-y-16 lg:px-8 xl:px-10'>
            <Header
                pageTitle={'Contact Me'}
                pageDesc={"Let's Get in Touch - Reach out to me and let's discuss how we can collaborate or work together"}
            />

            <div className='space-y-16 flex felx-col flex-wrap sm:flex-row xl:flex-row xl:space-y-8'>
                <div className='w-full space-y-5 flex flex-col flex-wrap justify-center align-middle sm:flex-row xl:w-1/2 xl:flex-col xl:space-y-0'>
                    <section className='w-full space-y-5  dark:text-primary-100 sm:w-[50%] sm:py-16 xl:py-10'>
                        <h6 className='flex gap-5'>
                            <IoCallOutline size={25} className='dark:text-white' />
                            <a href='tel:+989370938781'>+98-937-093-8781</a>
                        </h6>
                        <h6 className='flex gap-5'>
                            <TfiEmail size={23} className='dark:text-white' />
                            <a href='mailto:salimi.devop@gmail.com'>salimi.devop@gmail.com</a>
                        </h6>
                        <h6 className='flex gap-5'>
                            <FaWhatsapp size={25} className='dark:text-white' />
                            <a href='https://wa.me/+989370938781'>Send Message on WhatsApp</a>
                        </h6>
                        <h6 className='flex gap-5'>
                            <TfiLocationPin size={26} className='dark:text-white' /> <p>Alborz , Iran</p>
                        </h6>
                    </section>

                    <section className='sm:w-1/2 xl:w-3/4 xl:h-[250px]'>
                        <Map />
                    </section>
                </div>

                <section className='w-full space-y-3 xl:w-1/2 xl:space-y-6'>
                    <h3 className='mb-8 xl:hidden'>Get in Touch</h3>
                    <h4 className='flex justify-start'>Leave me a Message</h4>

                    <form ref={form} onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='w-full space-y-2'>
                        <input {...register('name')} autoComplete='new' placeholder='Full Name' className={inputStyle} />
                        <input {...register('email')} placeholder='Email' className={inputStyle} />
                        <textarea {...register('message')} rows='10' placeholder='Message' className={inputStyle} />
                        <input
                            type='submit'
                            value='Send Message'
                            className='w-full py-2 bg-primary-300 text-primary-white cursor-pointer'
                        />

                        <AnimatePresence>
                            <ul className='w-full px-1 space-y-1 bg-red-200 list-disc overflow-hidden'>
                                {errors?.name?.message && (
                                    <motion.li
                                        variants={errorEffect}
                                        initial='initial'
                                        animate='animate'
                                        className='flex gap-1 py-1'>
                                        <label className='text-red-700 text-sm font-bold'>● Full Name: </label>
                                        {<p className={errorStyle}>{errors?.name?.message}</p>}
                                    </motion.li>
                                )}
                                {errors?.email?.message && (
                                    <motion.li
                                        variants={errorEffect}
                                        initial='initial'
                                        animate='animate'
                                        className='flex gap-1 py-1'>
                                        <label className='text-red-700 text-sm font-bold'>● Email:</label>
                                        {<p className={errorStyle}>{errors?.email?.message}</p>}
                                    </motion.li>
                                )}
                                {errors?.message?.message && (
                                    <motion.li
                                        variants={errorEffect}
                                        initial='initial'
                                        animate='animate'
                                        className='flex gap-1 py-1'>
                                        <label className='text-red-700 text-sm font-bold'>● Message: </label>
                                        {<p className={errorStyle}>{errors?.message?.message}</p>}
                                    </motion.li>
                                )}
                            </ul>
                            {loading && <ThreeDots height='0.8rem' stroke='#fcd34d' fill='#fbbf24' />}
                            <p className='font-nunito font-bold text-black dark:text-white'>{sendingStatus}</p>
                        </AnimatePresence>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Contact;
