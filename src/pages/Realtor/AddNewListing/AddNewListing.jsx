/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/layout/Layout';
import {
  Button,
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

  const [imagePreviews, setImagePreviews] = useState(
    propertyBeingEdited ? [...propertyBeingEdited.property_images] : []
  );
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

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImageFiles((prevFiles) => [...prevFiles, ...files]);
    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleCreateProperty = async (data) => {
    setLoading(true);
    let allPublicIds = [];
    const singleFormData = new FormData();
    const multipleFormData = new FormData();

    // Handle feature image
    if (imageFile) {
      if (imageFile instanceof File) {
        singleFormData.append('feature_image', imageFile);
      } else {
        allPublicIds.push(imageFile.public_id);
      }
    }

    // Handle property images
    if (imageFiles && imageFiles.length > 0) {
      imageFiles.forEach((image, index) => {
        if (image instanceof File) {
          multipleFormData.append('property_images[]', imageFiles[index]);
        } else {
          allPublicIds.push(image.public_id);
        }
      });
    }

    try {
      let featureImageUrl;
      let propertyImageUrls = [];

      // Upload new feature image if it's a File
      if (imageFile instanceof File) {
        const response = await dispatch(
          uploadPropertyImage(singleFormData)
        ).unwrap();
        featureImageUrl = response.feature_image;
      } else {
        featureImageUrl = imageFile;
      }

      // Upload new property images
      const newImages = imageFiles.filter((img) => img instanceof File);
      if (newImages.length > 0) {
        const response = await dispatch(
          uploadPropertyImages(multipleFormData)
        ).unwrap();
        propertyImageUrls = response.property_images;
      }
      const existingImages = imagePreviews.filter((img) => img.public_id);
      // Add existing property images
      propertyImageUrls = [...propertyImageUrls, ...existingImages];

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

        feature_image: propertyBeingEdited
          ? featureImageUrl || propertyBeingEdited?.feature_image
          : JSON.stringify(featureImageUrl),
        property_images: propertyBeingEdited
          ? propertyImageUrls.map((image) => ({
              url: image.url,
              public_id: image.public_id,
            })) || propertyBeingEdited?.property_images
          : propertyImageUrls.map((image) => ({
              url: image.url,
              public_id: image.public_id,
            })),
        all_public_ids: allPublicIds,
      };

      if (propertyBeingEdited) {
        // For editing, include the current feature image and property images public_ids
        submitData.current_feature_image_id =
          propertyBeingEdited.feature_image?.public_id;
        submitData.current_property_image_ids =
          propertyBeingEdited.property_images.map((img) => img.public_id);
      }

      const id = propertyBeingEdited?.id;
      if (propertyBeingEdited) {
        await dispatch(editRealtorProperty({ data: submitData, id })).unwrap();
        setLoading(false);
        showToastMessage('Property updated successfully');
        navigate(ROUTES.realtorsProperties);
      } else {
        await dispatch(addProperty(submitData)).unwrap();
        setLoading(false);
        showToastMessage('Property added successfully');
        navigate(ROUTES.realtorsProperties);
      }
    } catch (error) {
      setLoading(false);
      showErrorMessage(
        error?.response?.data?.message || 'Error processing property'
      );
    }
  };
  const handleClearFeatureImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <>
      <Layout>
        <div className='max-w-7xl mx-auto px-4 py-6'>
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
                      src={
                        imagePreview || propertyBeingEdited?.feature_image?.url
                      }
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
                        className='h-40 w-40 object-cover'
                      />
                      <button
                        className='bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md mt-2'
                        onClick={handleClearFeatureImage}
                      >
                        Remove
                      </button>
                      {/* <Icon
                        icon='ic:outline-close'
                        className='absolute top-0 right-0 z-1 cursor-pointer text-red-500'
                        fontSize={34}
                        fontWeight={700}
                        onClick={handleClearFeatureImage}
                      /> */}
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

              <div className='relative cursor-pointer'>
                {imagePreviews?.length > 0 && (
                  <div className='w-full h-[156px] border-2 border-dashed border-[#B5BDC9] flex items-center flex-wrap justify-center'>
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className='flex items-center gap-4'>
                        <img
                          src={preview.url || preview}
                          alt='Preview'
                          className='h-20 w-20 rounded-lg object-cover"'
                        />
                        <Icon
                          icon='ic:outline-close'
                          className='bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md z-10'
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
                      className='absolute top-0 left-0 opacity-0 w-full h-full z-1 bg-[#494748] cursor-pointer'
                      disabled={imagePreviews?.length >= 4}
                      multiple
                      name='property_images[]'
                    />
                    <Button
                      className='cursor-pointer mt-4'
                      disabled={imagePreviews?.length >= 4}
                    >
                      {isPhotoLoading ? (
                        <Spinner sx={{ color: '#7148E5' }} />
                      ) : (
                        'Add more images'
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
                              <span>Upload files</span>
                              <input
                                id='additional-images'
                                name='additional-images'
                                type='file'
                                className='sr-only'
                                onChange={(e) =>
                                  handleImageChange(e, 'additional')
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

            <div className='mt-6 flex items-center gap-4 '>
              <button
                className='text-gray-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5  '
                onClick={() => navigate(ROUTES.realtorsProperties)}
              >
                Cancel
              </button>
              <Button
                type='submit'
                className='flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
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
