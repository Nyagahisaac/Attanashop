import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from '../context/SidebarContext';
import ToolsServices from '../services/ToolsServices';
import { notifyError, notifySuccess } from '../utils/toast';


const useToolsSubmit = (id) => {
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

    const ToolsData = {
      tool: data.tool,
      image: imageUrl,
    };
    console.log("this is children");
    console.log(ToolsData);

    if (id) {
      ToolsServices.updateTools(id, ToolsData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      ToolsServices.addTools(ToolsData)
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
      setValue('tool');

      setImageUrl('');
      clearErrors('tool');

      return;
    }

    if (id) {
      ToolsServices.getToolsById(id)
        .then((res) => {

          if (res) {
            setValue('tool', res.tool);
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

export default useToolsSubmit;
