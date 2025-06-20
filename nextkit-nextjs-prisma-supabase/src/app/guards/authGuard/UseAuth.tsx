'use client'
import { useContext } from 'react';
import AuthContext from '@/app/context/AuthContext';


const useAuth = () => useContext(AuthContext);

export default useAuth;
