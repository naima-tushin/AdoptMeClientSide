import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import BasicTableUser from './BasicTableUser';

const Users = () => {
    const axiosSecure = useAxiosSecure();
    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/user');
            return res.data; 
        }
    })

    return (
        <div>
        <div className='flex justify-evenly text-3xl my-4'>
        <h2>All Users</h2>
        {/* <h2>Total Users: {user.length}</h2> */}
        </div>
        <BasicTableUser></BasicTableUser>
        </div>
    );
};

export default Users;