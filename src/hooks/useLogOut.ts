import { useDispatch } from 'react-redux';
import { removeToken } from "@/features/auth/server/auth.actions";
import { setAuthInfo } from "../features/auth/store/auth.slice";
import { useRouter } from 'next/navigation';


export default function useLogOut() {
    const dispatch = useDispatch();
    const router = useRouter();
    
    const logOut = async () => {
        await removeToken();
        dispatch(setAuthInfo({
            isAuthenticated: false,
            userInfo: null
        }));
        router.push('/login');
        router.refresh();
    };
    return { logOut }
}