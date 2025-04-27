import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

    const { loading } = useSelector((state) => state.auth);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }
    
    return (
        <div>
            {
                loading ? (
                    <div className='spinner'></div>
                ) : (
                    <div>
                        <h1>
                            {!emailSent ? "Reset your Password" : "Check Email"}
                        </h1>
                        <p>
                            {!emailSent
                                ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                                : `We have sent the reset email to ${email}`}
                        </p>
                        <form onSubmit={handleOnSubmit}>
                            {!emailSent && (
                                <label>
                                    <p>
                                        Email Address <sup>*</sup>
                                    </p>
                                    <input
                                        required
                                        type='email'
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmailSent(e.target.value)}
                                        placeholder='Enter email address'
                                        className='form-style w-full'
                                    />
                                </label>
                            )}
                            <button
                                type='submit'

                            >
                                {!emailSent ? "Submit" : "Reset Email"}
                            </button>
                        </form>
                        <div>
                            <Link to="/login">
                                <p>
                                    <BiArrowBack /> Back to Login
                                </p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword