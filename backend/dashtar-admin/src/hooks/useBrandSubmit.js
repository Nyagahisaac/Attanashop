import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from '../context/SidebarContext';
import BrandServices from '../services/BrandServices';
import { notifyError, notifySuccess } from '../utils/toast';

const useBrandSubmit = (id) => {
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
    const BrandData = {
      brandname: data.brandname,
      image: imageUrl,
    };
   
  
    if (id) {
      BrandServices.updateBrand(id, BrandData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      BrandServices.addBrand(BrandData)
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
      setValue('brandname');
      
      setImageUrl('');
      clearErrors('brandname');
      return;
    }
    
    if (id) {
      BrandServices.getBrandById(id)
        .then((res) => {
          if (res) {
            setValue('brandname', res.brandname);
            setImageUrl(res.image);
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

export default useBrandSubmit;
