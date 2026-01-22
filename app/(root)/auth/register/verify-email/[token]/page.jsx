import { use } from 'react'
const EmailVerification = ({ params }) => {
    const { token } = use(params);
    console.log(token);
    return (
        <div>
            <h1>Email Verification</h1>
        </div>
    );
};

export default EmailVerification;