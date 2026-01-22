"use client";
import { use, useEffect } from 'react'
import axios from 'axios'
const EmailVerification = ({ params }) => {
    const { token } = use(params);
    const [isVerified, setIsVerified] = useState(false);
    useEffect(() => {
       const verify = async () => {
        const { data: verificationResponse } = await axios.post(
            "/api/auth/verify-email",
            { token }
        );
        if (verificationResponse.success) {
            setIsVerified(true);
        }
       } 
       verify();
    }, [token]);
    return (
        <div>
            {isVerified ? <h1>Email Verified</h1> : <h1>Email Verification Failed</h1>}
        </div>
    );
};

export default EmailVerification;