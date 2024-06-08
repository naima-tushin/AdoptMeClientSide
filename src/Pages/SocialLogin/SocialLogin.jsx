import { FaGoogle, FaGithub } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

const SocialLogin = () => {
    const { googleLogin, githubLogin } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || "/";

    const handleSocialLogin = async (socialProvider) => {
        try {
            const result = await socialProvider();
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                role: 'user',
            };
            const res = await axiosPublic.post('/User', userInfo);
            console.log(res.data);
            if (res.data.insertedId || res.data.message === 'User already exists') {
                navigate(from, { replace: true });
            } else {
                console.error('User creation failed');
            }
        } catch (error) {
            console.error('Social login error:', error);
        }
    };

    return (
        <div className="font-roboto">
            <div className="flex items-center justify-center gap-4 mt-3">
                <button
                    onClick={() => handleSocialLogin(googleLogin)}
                    className="bg-transparent hover:bg-primary text-black hover:text-black border-black border-2 px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                >
                    <FaGoogle />
                    <span>Sign in with Google</span>
                </button>

                <button
                    onClick={() => handleSocialLogin(githubLogin)}
                    className="bg-black hover:bg-primary hover:text-black hover:border-black text-accent border-2 border-accent px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                >
                    <FaGithub />
                    <span>Sign in with GitHub</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
