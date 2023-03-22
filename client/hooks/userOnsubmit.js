import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router';

import UserServices from 'services/userServices';

const useUserSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [imageUrl, setImageUrl] = useState('');
  const location = useLocation();
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!imageUrl) {
      notifyError('Image is required!');
      return;
    }
    const staffData = {
      username: data.username,
      email: data.email,
      password: data.password,
      phonenumber: data.phonenumber,
      address: data.address,
    };

    if (id) {
      UserServices.updateStaff(id, { email: adminInfo.email, data: staffData })
        .then((res) => {
          setIsUpdate(true);
          notifySuccess('Staff Updated Successfully!');
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      UserServices.addStaff({ email: adminInfo.email, data: staffData })
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  return {
    handleSubmit,
    onSubmit,
  };
};

export default useUserSubmit ;