import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../../services/apiConnector';

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const submitContactForm = async (data) => {
        // console.log("Form Data - ", data);
        try {
            setLoading(true);
            const response = await apiConnector(
                "POST",
                contactusEndpoint.CONTACT_US_API,
                data
            )
            console.log("Email Response -", response);
            setLoading(false);
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [reset, isSubmitSuccessful])

    return (
        <form
            className='flex flex-col gap-7'
            onSubmit={handleSubmit(submitContactForm)}
        >
            <div className="flex flex-col gap-5 lg:flex-row">
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="firstname" className="lable-style">
                        First Name
                    </label>
                    <input
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter first name'
                        className='form-style'
                        {...register("firstname", { required: true })}
                    />
                    {
                        errors.firstname && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your name
                            </span>
                        )
                    }
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="lastname" className="lable-style">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            placeholder="Enter last name"
                            className="form-style"
                            {...register("lastname")}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ContactUsForm