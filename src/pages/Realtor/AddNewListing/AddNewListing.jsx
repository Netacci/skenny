import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/layout/Layout';
import {
  Button,
  Card,
  Checkbox,
  Typography,
  Input,
  Select,
  Option,
  Textarea,
  Spinner,
} from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import countries from '../../../utils/countries.json';
import { states } from '../../../utils/states';
import { Icon } from '@iconify/react';
import {
  addProperty,
  editRealtorProperty,
  uploadPropertyImage,
  uploadPropertyImages,
} from '../../../redux/realtor/propertiesSlice';
import {
  showErrorMessage,
  showToastMessage,
} from '../../../components/toast/toast';
import { ROUTES } from '../../../utils/routes';

const AddNewListing = () => {
  const navigate = useNavigate();
  const { propertyBeingEdited } = useSelector((state) => state.properties);
  console.log(propertyBeingEdited);
  const [country, setCountry] = useState(
    propertyBeingEdited?.country || 'Nigeria'
  );
  const dispatch = useDispatch();
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [state, setState] = useState(propertyBeingEdited?.state || '');
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState(
    propertyBeingEdited?.property_details?.property_type || ''
  );
  const { handleSubmit, register, setValue } = useForm({
    defaultValues: {
      propertyName:
        (propertyBeingEdited && propertyBeingEdited?.property_name) || '',
      propertyDescription: propertyBeingEdited?.property_description || '',
      address: propertyBeingEdited?.address || '',
      country: propertyBeingEdited?.country || 'Nigeria',
      state: propertyBeingEdited?.state || '',
      city: propertyBeingEdited?.city || '',
      propertyType: propertyBeingEdited?.property_details?.property_type || '',
      propertyRoom: propertyBeingEdited?.property_details?.property_beds || '',
      propertyToilet:
        propertyBeingEdited?.property_details?.property_toilets || '',
      propertyBath: propertyBeingEdited?.property_details?.property_baths || '',
      propertyArea: propertyBeingEdited?.property_details?.property_area || '',
      propertyStatus:
        propertyBeingEdited?.property_details?.property_status || '',
      propertyPrice:
        propertyBeingEdited?.property_details?.property_price || '',
    },
  });
  useEffect(() => {
    setValue('propertyName', propertyBeingEdited?.property_name || '');
    setValue('propertyDescription', propertyBeingEdited?.property_description);
    setValue('address', propertyBeingEdited?.address);
    setValue('country', propertyBeingEdited?.country || 'Nigeria');
    setValue('state', propertyBeingEdited?.state || '');
    setValue('city', propertyBeingEdited?.city || '');
    setValue(
      'propertyType',
      propertyBeingEdited?.property_details?.property_type || ''
    );
    setValue(
      'propertyRoom',
      propertyBeingEdited?.property_details?.property_beds || ''
    );
    setValue(
      'propertyToilet',
      propertyBeingEdited?.property_details?.property_toilets || ''
    );
    setValue(
      'propertyBath',
      propertyBeingEdited?.property_details?.property_baths || ''
    );
    setValue(
      'propertyArea',
      propertyBeingEdited?.property_details?.property_area || ''
    );
    setValue(
      'propertyStatus',
      propertyBeingEdited?.property_details?.property_status || ''
    );
    setValue(
      'propertyPrice',
      propertyBeingEdited?.property_details?.property_price || ''
    );
  }, [propertyBeingEdited, setValue]);
  const propertyTypeList = [
    'House',
    'Apartment',
    'TownHouse',
    'PentHouse',
    'Bungalow',
    'Duplex',
    'Flat',
    'Land',
    'Office',
  ];
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setImageFiles((prevFiles) => [...prevFiles, ...files]);

  //   const newPreviews = files.map((file) => URL.createObjectURL(file));
  //   setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  // };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prevFiles) => [...prevFiles, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  console.log(propertyBeingEdited);
  const handleCreateProperty = async (data) => {
    setLoading(true);
    const singleFormData = new FormData();
    const multipleFormData = new FormData();
    if (imageFile) {
      singleFormData.append('feature_image', imageFile);
    }

    if (imageFiles && imageFiles?.length > 0) {
      for (let i = 0; i < imageFiles?.length; i++) {
        multipleFormData.append('property_images[]', imageFiles[i]);
      }
    }

    try {
      let featureImageUrl;
      let propertyImageUrls = [];

      // Upload feature image
      if (imageFile) {
        const response = await dispatch(
          uploadPropertyImage(singleFormData)
        ).unwrap();
        featureImageUrl = response.feature_image;
      }

      // Upload property images
      if (imageFiles && imageFiles.length > 0) {
        const response = await dispatch(
          uploadPropertyImages(multipleFormData)
        ).unwrap();
        propertyImageUrls = response.property_images;
      }

      // Construct submitData object
      const submitData = {
        property_name: data.propertyName,
        property_description: data.propertyDescription,
        address: data.address,
        country: data.country,
        state: state,
        city: data.city,
        property_details: {
          property_type: propertyType,
          property_beds: data.propertyRoom,
          property_toilets: data.propertyToilet,
          property_baths: data.propertyBath,
          property_area: data.propertyArea,
          property_status: data.propertyStatus,
          property_price: data.propertyPrice,
        },
        feature_image: featureImageUrl,
        property_images: propertyImageUrls,
      };
      const id = propertyBeingEdited?.id;
      if (propertyBeingEdited) {
        dispatch(editRealtorProperty({ data: submitData, id }))
          .unwrap()
          .then(() => {
            setLoading(false);
            showToastMessage('Property updated successfully');
            navigate(ROUTES.realtorsProperties);
          })
          .catch((err) => {
            setLoading(false);
            showErrorMessage(
              err?.response?.data?.message || 'Failed to update property'
            );
          });
      } else {
        dispatch(addProperty(submitData))
          .unwrap()
          .then(() => {
            setLoading(false);
            showToastMessage('Property added successfully');
            navigate(ROUTES.realtorsProperties);
          })
          .catch((err) => {
            setLoading(false);
            showErrorMessage(
              err?.response?.data?.message || 'Failed to add property'
            );
          });
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };
  const handleClearFeatureImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };
  // useEffect(() => {
  //   return () => {
  //     imagePreviews.forEach((url) => URL.revokeObjectURL(url));
  //   };
  // }, [propertyBeingEdited]);
  // const images =
  //   propertyBeingEdited && imagePreviews.length > 0
  //     ? imagePreviews
  //     : propertyBeingEdited?.property_images;

  // console.log(images);
  // console.log(imagePreviews);
  // console.log(propertyBeingEdited?.property_images);
  return (
    <>
      <Layout>
        <div className='container mx-auto px-4 py-8'>
          <h1 className='text-3xl font-bold mb-6'>
            {propertyBeingEdited ? 'Edit Property' : 'Add New Property'}
          </h1>
          <form
            onSubmit={handleSubmit(handleCreateProperty)}
            className='space-y-6'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label
                  htmlFor='propertyName'
                  className='block text-sm font-medium text-gray-700'
                >
                  Property Name
                </label>

                <Input
                  size='lg'
                  className='mt-1 block w-full rounded-md   !border-t-indigo-300 '
                  name='propertyName'
                  type='text'
                  {...register('propertyName')}
                />
              </div>

              <div>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700'
                >
                  Address
                </label>
                <Input
                  size='lg'
                  className='mt-1 block w-full rounded-md   !border-t-indigo-300 '
                  type='text'
                  name='address'
                  {...register('address')}
                />
              </div>
              <div>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700'
                >
                  Property Description
                </label>

                <Textarea
                  rows='3'
                  size='lg'
                  className='mt-1 block w-full rounded-md   !border-t-indigo-300 '
                  name='propertyDescription'
                  {...register('propertyDescription')}
                />
              </div>
              <div>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700'
                >
                  City
                </label>
                <Input
                  size='lg'
                  className='mt-1 block w-full rounded-md   !border-t-indigo-300 '
                  type='text'
                  name='city'
                  {...register('city')}
                />
              </div>
              <div>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700'
                >
                  Country
                </label>
                <Select
                  {...register('country')}
                  size='lg'
                  name='country'
                  onChange={(country) => setCountry(country)}
                  value={country}
                  className='mt-1 block w-full rounded-md   !border-t-indigo-300 '
                >
                  {countries &&
                    countries.map((item) => (
                      <Option
                        value={item.name}
                        key={item.name}
                        sx={{ py: '8px' }}
                      >
                        {item.name}
                      </Option>
                    ))}
                </Select>
              </div>
              <div>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700'
                >
                  State
                </label>

                {country === 'Nigeria' ? (
                  <Select
                    name='state'
                    {...register('state')}
                    onChange={(state) => setState(state)}
                    value={state}
                    className='mt-1 block w-full rounded-md   !border-t-indigo-300 '
                  >
                    {states.map((item) => (
                      <Option value={item} key={item} sx={{ py: '8px' }}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <Input
                    size='lg'
                    className='mt-1 block w-full rounded-md   !border-t-indigo-300 '
                    type='text'
                    name='state'
                    {...register('state')}
                  />
                )}
              </div>

              <div>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700'
                >
                  Type
                </label>
                <Select
                  name='propertyType'
                  {...register('propertyType')}
                  onChange={(type) => setPropertyType(type)}
                  value={propertyType}
                  className='mt-1 block w-full rounded-md   !border-t-indigo-300 '
                >
                  {propertyTypeList.map((item) => (
                    <Option value={item} key={item} sx={{ py: '8px' }}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </div>
              <div>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700'
                >
                  No of rooms
                </label>
                <Input
                  size='lg'
                  className='mt-1 block w-full rounded-md   !border-t-indigo-300 '
                  type='text'
                  name='address'
                  placeholder='1, 2, 3'
                  {...register('propertyRoom')}
                />
              </div>
              <div>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700'
                >
                  No of toilet
                </label>
                <Input
                  size='lg'
                  className='mt-1 block w-full rounded-md   !border-t-indigo-300 '
                  type='text'
                  name='address'
                  placeholder='1, 2, 3'
                  {...register('propertyToilet')}
                />
              </div>
              <div>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700'
                >
                  No of bathroom
                </label>
                <Input
                  size='lg'
                  className='mt-1 block w-full rounded-md   !border-t-indigo-300 '
                  type='text'
                  name='address'
                  placeholder='1, 2, 3'
                  {...register('propertyBath')}
                />
              </div>
              <div>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700'
                >
                  Size of property
                </label>
                <Input
                  size='lg'
                  className='mt-1 block w-full rounded-md   !border-t-indigo-300 '
                  type='text'
                  name='propertyArea'
                  placeholder='Square feet'
                  {...register('propertyArea')}
                />
              </div>
              <div>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700'
                >
                  Status of property
                </label>
                <Input
                  size='lg'
                  className='mt-1 block w-full rounded-md   !border-t-indigo-300 '
                  type='text'
                  name='propertyStatus'
                  placeholder='For rent, for sale'
                  {...register('propertyStatus')}
                />
              </div>
              <div>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700'
                >
                  Price
                </label>
                <Input
                  size='lg'
                  className='mt-1 block w-full rounded-md   !border-t-indigo-300 '
                  type='number'
                  name='propertyPrice'
                  placeholder='Enter price'
                  {...register('propertyPrice')}
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Feature Image
              </label>
              {propertyBeingEdited ? (
                <div className='mr-4 w-full flex items-center gap-4 '>
                  <div>
                    <img
                      alt='profile'
                      src={imagePreview || propertyBeingEdited?.feature_image}
                      className='h-[72px] w-[72px] rounded-full'
                    />
                  </div>
                  <div className='relative cursor-pointer'>
                    <input
                      type='file'
                      accept='.jpg, .jpeg, .png'
                      name='feature_image'
                      onChange={handleFileChange}
                      size='2000000'
                      className='absolute top-0 left-0 opacity-0 w-full h-full z-1 bg-[#494748] cursor-pointer'
                    />
                    <Button className='cursor-pointer '>
                      {isPhotoLoading ? (
                        <Spinner sx={{ color: '#7148E5' }} />
                      ) : (
                        'Update Photo'
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className='relative cursor-pointer'>
                  {imagePreview ? (
                    <div>
                      <img
                        alt='profile'
                        src={imagePreview}
                        className='object-cover h-[100px] w-[100px] '
                      />

                      <Icon
                        icon='ic:outline-close'
                        className='absolute top-0 right-0 z-1 cursor-pointer text-red-500'
                        fontSize={34}
                        fontWeight={700}
                        onClick={handleClearFeatureImage}
                      />
                    </div>
                  ) : (
                    <div>
                      <input
                        type='file'
                        accept='.jpg, .jpeg, .png'
                        name='feature_image'
                        onChange={handleFileChange}
                        size='2000000'
                        className='absolute top-0 left-0 opacity-0 w-full h-full z-1 bg-[#494748] cursor-pointer'
                      />
                      <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                        {isPhotoLoading ? (
                          <Spinner sx={{ color: '#7148E5' }} />
                        ) : (
                          <div className='space-y-1 text-center'>
                            <Icon
                              icon='lucide:upload'
                              className='mx-auto h-12 w-12 text-gray-400'
                            />
                            <div className='flex text-sm text-gray-600'>
                              <label
                                htmlFor='additional-images'
                                className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
                              >
                                <span>Upload feature image</span>
                                <input
                                  id='additional-images'
                                  name='additional-images'
                                  type='file'
                                  className='sr-only'
                                  onChange={(e) =>
                                    handleFileChange(e, 'additional')
                                  }
                                  accept='image/png, image/jpeg'
                                  multiple
                                />
                              </label>
                              <p className='pl-1'>or drag and drop</p>
                            </div>
                            <p className='text-xs text-gray-500'>
                              PNG or JPG up to 5MB each
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Additional Images
              </label>
              {propertyBeingEdited ? null : (
                <div className='relative cursor-pointer'>
                  {imagePreviews?.length === 0 ? null : (
                    <div className='w-full  h-[156px] border-2 border-dashed border-[#B5BDC9] flex items-center flex-wrap justify-center   '>
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className='flex items-center'>
                          <img
                            src={preview}
                            alt='Preview'
                            className='w-[156px] h-[56px] object-cover  rounded-lg'
                          />
                          <Icon
                            icon='ic:outline-close'
                            className=' cursor-pointer text-red-500 z-10'
                            fontSize={24}
                            fontWeight={700}
                            onClick={() => handleRemoveImage(index)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {imagePreviews?.length > 0 ? (
                    <div className='relative cursor-pointer'>
                      <input
                        type='file'
                        accept='.jpg, .jpeg, .png'
                        onChange={handleImageChange}
                        size='2000000'
                        className='absolute top-0 left-0 opacity-0 w-full h-full z-1 bg-[#494748]  cursor-pointer'
                        disabled={imagePreviews?.length >= 4}
                        multiple
                        name='property_images[]'
                      />
                      <Button
                        className='cursor-pointer mt-4 '
                        disabled={imagePreviews?.length >= 4}
                      >
                        {isPhotoLoading ? (
                          <Spinner sx={{ color: '#7148E5' }} />
                        ) : (
                          'Upload'
                        )}
                      </Button>
                      <Typography className='mt-2 text-red-500'>
                        Maximum 4 images
                      </Typography>
                    </div>
                  ) : (
                    <div>
                      <input
                        type='file'
                        accept='.jpg, .jpeg, .png'
                        onChange={handleImageChange}
                        multiple
                        size='2000000'
                        name='property_images[]'
                        className='absolute top-0 left-0 opacity-0 w-full h-full z-1 bg-[#494748]  cursor-pointer'
                      />

                      <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                        {isPhotoLoading ? (
                          <Spinner sx={{ color: '#7148E5' }} />
                        ) : (
                          <div className='space-y-1 text-center'>
                            <Icon
                              icon='lucide:upload'
                              className='mx-auto h-12 w-12 text-gray-400'
                            />
                            <div className='flex text-sm text-gray-600'>
                              <label
                                htmlFor='additional-images'
                                className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
                              >
                                <span>Upload files</span>
                                <input
                                  id='additional-images'
                                  name='additional-images'
                                  type='file'
                                  className='sr-only'
                                  onChange={(e) =>
                                    handleFileChange(e, 'additional')
                                  }
                                  accept='image/png, image/jpeg'
                                  multiple
                                />
                              </label>
                              <p className='pl-1'>or drag and drop</p>
                            </div>
                            <p className='text-xs text-gray-500'>
                              PNG or JPG up to 10MB each
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* {propertyBeingEdited &&
                formData.additionalImages &&
                formData.additionalImages.length > 0 && (
                  <p className='mt-2 text-sm text-gray-500'>
                    Current additional images:{' '}
                    {formData.additionalImages.join(', ')}
                  </p>
                )} */}
            </div>

            {!propertyBeingEdited && (
              <div className='flex items-center'>
                <input
                  id='terms'
                  name='terms'
                  type='checkbox'
                  className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                  required
                />
                <label
                  htmlFor='terms'
                  className='ml-2 block text-sm text-gray-900'
                >
                  I agree to the Terms and Conditions
                </label>
              </div>
            )}

            <div>
              <Button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                {loading ? (
                  <Spinner />
                ) : propertyBeingEdited ? (
                  'Update Property'
                ) : (
                  'Add porperty'
                )}
              </Button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default AddNewListing;
