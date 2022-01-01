import React from 'react';
import { useParams } from 'react-router-dom';
import useFirebase from '../../hooks/useFirebase';

const Profile = () => {
    let params = useParams();
    const { user, admin } = useFirebase();
    console.log(admin);
    return (
        <div>
            <h1>This profile is  {params.name}</h1>
            <h1>This profile is  {user.displayName}</h1>
        </div>
    );
};

export default Profile;