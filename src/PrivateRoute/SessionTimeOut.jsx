import { useRef } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/userSlice';


function SessionTimeOut() {
    const sessionTimeoutRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const onIdle = () => {
        console.log('User is idle')
        sessionTimeoutRef.current = setTimeout(logOut, 15*60000); // 5 seconds for testing, you can adjust this timeout
    };

    useIdleTimer({
        timeout: 15*60000, // 5 seconds for testing, you can adjust this timeout
        onIdle: onIdle,
    });

    const logOut = () => {
        alert("Session expired Please login again..")
        dispatch(logout());
        localStorage.removeItem('logIn');
        navigate('/login');
        clearTimeout(sessionTimeoutRef.current);
        console.log('User has been logged out');
    };


}

export default SessionTimeOut;
