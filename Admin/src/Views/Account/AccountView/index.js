import React, { useEffect } from 'react';
import PageLayout from '../../../Components/PageLayout'
import { fetchAuthSuperAdmin } from '../../../middlewares/fetchAuth';
import { useDispatch } from 'react-redux';

const Account = ({ ...rest }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const superAdminToken = JSON.parse(localStorage.getItem("accessSuperAdminToken"));
        if (superAdminToken && superAdminToken.token) {
          dispatch(fetchAuthSuperAdmin(superAdminToken.token));
        }
      }, [dispatch]);

    return (
        <PageLayout {...rest} title="account">
        
        </PageLayout>
    );
};

export default Account;