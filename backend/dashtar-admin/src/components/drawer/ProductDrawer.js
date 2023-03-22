import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Textarea, Select } from '@windmill/react-ui';
import ReactTagInput from '@pathofdev/react-tag-input';

import Title from '../form/Title';
import Error from '../form/Error';
import LabelArea from '../form/LabelArea';
import InputArea from '../form/InputArea';
import InputValue from '../form/InputValue';
import DrawerButton from '../form/DrawerButton';
import Uploader from '../image-uploader/Uploader';
import ChildrenCategory from '../category/ChildrenCategory';
import ParentCategory from '../category/ParentCategory';
import useProductSubmit from '../../hooks/useProductSubmit';
import BrandCategory from '../brands/BrandCategory';

const ProductDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    tag,
    setTag,
  } = useProductSubmit(id);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Update Product"
            description="Updated your product and necessary information from here"
          />
        ) : (
          <Title
            title="Add Product"
            description="Add your product and necessary information from here"
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="block">
          <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Image" />
              <div className="col-span-8 sm:col-span-4">
                <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product SKU" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  required="false"
                  label="Product SKU"
                  name="sku"
                  type="text"
                  placeholder="Product SKU"
                />
                <Error errorName={errors.sku} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Title/Name" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Product Title/Name"
                  name="title"
                  type="text"
                  placeholder="Product title"
                />
                <Error errorName={errors.title} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Slug" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  required="false"
                  label="Product Slug"
                  name="slug"
                  type="text"
                  placeholder="Product slug"
                />
                <Error errorName={errors.slug} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Description" />
              <div className="col-span-8 sm:col-span-4">
                <Textarea
                  className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  {...register('description', {
                    required: 'Description is required!',
                   
                  })}
                  name="description"
                  placeholder="Product details"
                  rows="4"
                  spellCheck="false"
                />
                <Error errorName={errors.description} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Parent Category" />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="parent"
                  {...register('parent', {
                    required: 'Product parent category is required!',
                  })}
                >
                  <option value="" defaultValue hidden>
                    Select main category
                  </option>
                  < ParentCategory />
                </Select>
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Brands" />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="brand"
                  {...register('brand', {
                    required: 'Product Brand is required!',
                  })}
                >
                  <option value="" defaultValue hidden>
                    Select Brands
                  </option>
                 
                < BrandCategory />
                </Select>
                <Error errorName={errors.brandname} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Sub Category" />
              <div className="col-span-8 sm:col-span-4">
              <Select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="children"
                  {...register('children', {
                    required: 'Product  subcategory is required!',
                  })}
                >
                  <option value="" defaultValue hidden>
                    Select subCategory
                  </option>
                  < ChildrenCategory />
                </Select>
               
                <Error errorName={errors.type} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Unit (kg/pc/lb/ml/g...etc)" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Unit"
                  name="unit"
                  type="text"
                  placeholder="Unit"
                />
                <Error errorName={errors.unit} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Quantity" />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  register={register}
                  maxValue={1000}
                  minValue={0}
                  label="Quantity"
                  name="quantity"
                  type="number"
                  placeholder="Quantity"
                />
                <Error errorName={errors.quantity} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Price" />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  register={register}
                  maxValue={2000000}
                  minValue={1}
                  label="Price"
                  name="originalPrice"
                  type="number"
                  placeholder="Price"
                />
                <Error errorName={errors.originalPrice} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Sale Price" />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  register={register}
                  maxValue={200000}
                  minValue={1}
                  defaultValue="0"
                  required="false"
                  label="Sale price"
                  name="salePrice"
                  type="number"
                  placeholder="Sale price"
                />
                <Error errorName={errors.salePrice} />
              </div>
            </div>

          
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Tag" />
              <div className="col-span-8 sm:col-span-4">
                <ReactTagInput
                  placeholder="Product Tag (Write then press enter to add new tag )"
                  tags={tag}
                  onChange={(newTags) => setTag(newTags)}
                />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Product" />
        </form>
      </Scrollbars>
    </>
  );
};

export default React.memo(ProductDrawer);
