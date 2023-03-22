import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from '../context/SidebarContext';
import CouponServices from '../services/CouponServices';
import { notifyError, notifySuccess } from '../utils/toast';

const useCouponSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState('');
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
      notifyError('Icon is required!');
      return;
    }
    const CouponData = {
      title: data.title,
      couponcode: data.couponCode,
      endtime: data.endTime,
      discountpercentage: data.discountPercentage,
      minimumamount: data.minimumAmount,
      type: data.productType,
      logo: imageUrl,
    };
   
  
    if (id) {
      CouponServices.updateCoupon(id, CouponData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      CouponServices.addCoupon(CouponData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };
  
  useEffect(() => {
    if (!isDrawerOpen) {
      setValue('title');
      setValue('type');
      setValue('couponcode');
      setValue('endtime');
      setValue('discountpercentage');
      setValue('minimumamount');
      setImageUrl('');
      clearErrors('title');
      clearErrors('type');
      clearErrors('couponcode');
      clearErrors('endtime');
      clearErrors('discountpercentage');
      clearErrors('minimumamount');
      return;
    }
    
    if (id) {
      CouponServices.getCouponById(id)
        .then((res) => {
          if (res) {
            setValue('title', res.title);
            setValue('type', res.productType);
            setValue('couponcode', res.couponCode);
            setValue('endtime', res.endTime);
            setValue('discountpercentage', res.discountPercentage);
            setValue('minimumamount', res.minimumAmount);
            setImageUrl(res.logo);
          }
        })
        .catch((err) => {
          notifyError('There is a server error!');
        });
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },

  [id, setValue, isDrawerOpen, clearErrors]);
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setImageUrl,
    imageUrl,
  };
};

export default useCouponSubmit;
