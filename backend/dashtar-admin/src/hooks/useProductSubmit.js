import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from '../context/SidebarContext';
import ProductServices from '../services/ProductServices';
import { notifyError, notifySuccess } from '../utils/toast';

const useProductSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState('');
  const [children, setChildren] = useState('');
  const [tag, setTag] = useState([]);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!imageUrl) {
      notifyError('Image is required!');
      return;
    }
    if (data.originalPrice < data.salePrice) {
      notifyError('SalePrice must be less then or equal of product price!');
      return;
    }

    const productData = {
      sku: data.sku,
      title: data.title,
      slug: data.slug
        ? data.slug
        : data.title.toLowerCase().replace('&', '').split(' ').join('-'),
      description: data.description,
      parent: data.parent,
      brand: data.brand,
      children: data.children,
      unit: data.unit,
      quantity: data.quantity,
      originalprice: data.originalPrice,
      price: data.salePrice ? data.salePrice : data.originalPrice,
      discount:
        data.salePrice > 0 &&
        ((data.originalPrice - data.salePrice) / data.originalPrice) * 100,
      image: imageUrl,
      tag: JSON.stringify(tag),
    };

    console.log(productData)

    if (id) {
      ProductServices.updateProduct(id, productData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      ProductServices.addProduct(productData)
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
      setValue('sku');
      setValue('title');
      setValue('slug');
      setValue('description');
      setValue('parent');
      setValue('brand');
      setValue('children');
      setValue('unit');
      setValue('quantity');
      setValue('productprice');
      setValue('saleprice');
      setImageUrl('');
      setChildren('');
      setTag([]);
      clearErrors('sku');
      clearErrors('title');
      clearErrors('slug');
      clearErrors('description');
      clearErrors('parent');
      clearErrors('brand');
      clearErrors('children');
      clearErrors('unit');
      clearErrors('quantity');
      clearErrors('productprice');
      clearErrors('saleprice');
      clearErrors('tax1');
      clearErrors('tax2');
      return;
    }

    if (id) {
      ProductServices.getProductById(id)
        .then((res) => {
          if (res) {
            setValue('sku', res.sku);
            setValue('title', res.title);
            setValue('slug', res.slug);
            setValue('description', res.description);
            setValue('parent', res.parent);
            setValue('brand', res.brand);
            setValue('children', res.children);
            setValue('unit', res.unit);
            setValue('quantity', res.quantity);
            setValue('originalprice', res.productprice);
            setValue('saleprice', res.price);
            setTag(JSON.parse(res.tag));
            setImageUrl(res.image);
          }
        })
        .catch((err) => {
          notifyError('There is a server error!');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);

  useEffect(() => {
    setChildren(watch('children'));
  }, [watch, children]);

  return {
    register,
    watch,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    tag,
    setTag,
  };
};

export default useProductSubmit;
