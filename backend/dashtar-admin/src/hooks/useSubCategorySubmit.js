import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from '../context/SidebarContext';
import SubCategoryServices from '../services/SubCategoryServices';
import { notifyError, notifySuccess } from '../utils/toast';


const useSubCategorySubmit = (id) => {
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
      notifyError(`image is required! ${imageUrl}`);
      return;
    }
  
    const subcategoryData = {
      type: data.type,
      image: imageUrl,
    
    };
    // console.log("this is children");
    // console.log(subcategoryData );
    if (id) {
      SubCategoryServices.updateSubCategory(id, subcategoryData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      SubCategoryServices.addSubCategory(subcategoryData)
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
      setValue('type');

      setImageUrl('');
      clearErrors('type');
      return;
    }

    if (id) {
      SubCategoryServices.getSubCategoryById(id)
        .then((res) => {
          
          if (res) {
            
            setValue('type', res.type);
            setImageUrl(res.image);
          }
        })
        .catch((err) => {
          notifyError('There is a server error!');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,

  };
};

export default useSubCategorySubmit;
