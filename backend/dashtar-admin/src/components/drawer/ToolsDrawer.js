import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import {  Select } from '@windmill/react-ui';


import Error from '../form/Error';
import Title from '../form/Title';
import InputArea from '../form/InputArea';
import LabelArea from '../form/LabelArea';
import DrawerButton from '../form/DrawerButton';
import Uploader from '../image-uploader/Uploader';

import useToolsSubmit from '../../hooks/useToolsSubmit';
import ChildrenCategory from '../category/ChildrenCategory';

const ToolcategoryDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
  } = useToolsSubmit(id);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Update Tools Category"
            description="Updated your Product Tool category and necessary information from here"
          />
        ) : (
          <Title
            title="Add Tool Category"
            description=" Add your Product category and necessary information from here"
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Category Icon" />
              <div className="col-span-8 sm:col-span-4">
                <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Main Category" />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="subcategory_id"
                  {...register('subcategory_id', {
                    required: 'Product parent category is required!',
                  })}
                >
                  <option value="" >
                    Select  SubCategory
                  </option>
                  < ChildrenCategory />
                </Select>
                <Error errorName={errors.name} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Tools Category" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Tools name"
                  name="tool"
                  type="text"
                  placeholder="Tools Category title"
                />
                <Error errorName={errors.tool} />
              </div>
            </div>
           

          </div>

          <DrawerButton id={id} title="Tools" />
        </form>
      </Scrollbars>
    </>
  );
};

export default ToolcategoryDrawer;
