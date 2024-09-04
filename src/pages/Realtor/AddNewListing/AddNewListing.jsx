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
        <Card
          color='transparent'
          shadow={false}
          className='w-full lg:w-[50%] max-w-md p-8 lg:p-0 mx-auto  my-4'
        >
          <Typography variant='h4' color='blue-gray'>
            Add new property
          </Typography>

          <form
            className='mt-4 mb-2 w-80 max-w-screen-lg sm:w-96'
            onSubmit={handleSubmit(handleCreateProperty)}
          >
            <div className='mb-1 flex flex-col gap-6'>
              {/* <Input
                size='lg'
                className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                label='Add feature image'
                type='file'
                accept='.jpg, .jpeg, .png'
                multiple
              /> */}
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
                      className='absolute top-0 left-0 opacity-0 w-full h-full z-1 bg-[#494748]  cursor-pointer'
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
                        className='w-full  '
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
                        className='absolute top-0 left-0 opacity-0 w-full h-full z-1 bg-[#494748]  cursor-pointer'
                      />

                      <div className='bg-[#F1F2F6] w-full  h-[156px] border-2 border-dashed border-[#B5BDC9] rounded-[8px] mb-4 text-center cursor-pointer pt-[20px] lg:pt-[20px] lg:px-[64px] lg:pb-[0px]'>
                        {isPhotoLoading ? (
                          <Spinner sx={{ color: '#7148E5' }} />
                        ) : (
                          <Icon
                            icon='ep:upload-filled'
                            fontSize={48}
                            className='text-center mx-auto'
                          />
                        )}

                        <div className=' mx-auto mt-[4px]'>
                          <Typography
                            sx={{ color: '#1A3A50', fontSize: '14px' }}
                          >
                            Upload feature image
                          </Typography>
                          <Typography
                            sx={{ color: '#526581', fontSize: '12px' }}
                          >
                            File type: .PNG or JPG
                          </Typography>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <Input
                size='lg'
                className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                label='Property Name'
                name='propertyName'
                type='text'
                {...register('propertyName')}
              />
              <Textarea
                size='lg'
                className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                label='Property Description'
                name='propertyDescription'
                {...register('propertyDescription')}
              />

              <Input
                size='lg'
                className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                type='text'
                name='address'
                label='Address'
                {...register('address')}
              />
              <Input
                size='lg'
                className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                type='text'
                name='city'
                label='City'
                {...register('city')}
              />
              <Select
                {...register('country')}
                size='lg'
                label='Country'
                name='country'
                onChange={(country) => setCountry(country)}
                value={country}
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

              {country === 'Nigeria' ? (
                <Select
                  label='State'
                  name='state'
                  {...register('state')}
                  onChange={(state) => setState(state)}
                  value={state}
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
                  className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                  type='text'
                  name='state'
                  label='State'
                  {...register('state')}
                />
              )}
              <Select
                label='Property Type'
                name='propertyType'
                {...register('propertyType')}
                onChange={(type) => setPropertyType(type)}
                value={propertyType}
              >
                {propertyTypeList.map((item) => (
                  <Option value={item} key={item} sx={{ py: '8px' }}>
                    {item}
                  </Option>
                ))}
              </Select>
              <Input
                size='lg'
                className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                type='text'
                name='address'
                label='No of rooms'
                placeholder='1, 2, 3'
                {...register('propertyRoom')}
              />
              <Input
                size='lg'
                className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                type='text'
                name='address'
                label='No of toilet'
                placeholder='1, 2, 3'
                {...register('propertyToilet')}
              />
              <Input
                size='lg'
                className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                type='text'
                name='address'
                label='No of bathroom'
                placeholder='1, 2, 3'
                {...register('propertyBath')}
              />
              <Input
                size='lg'
                className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                type='text'
                name='propertyArea'
                placeholder='Square feet'
                label='Size of property'
                {...register('propertyArea')}
              />
              <Input
                size='lg'
                className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                type='text'
                name='propertyStatus'
                placeholder='For rent, for sale'
                label='Status of property'
                {...register('propertyStatus')}
              />
              {/*TODO Change this to number later */}
              <Input
                size='lg'
                className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                type='text'
                name='propertyPrice'
                label='Price'
                placeholder='Enter price'
                {...register('propertyPrice')}
              />
              {propertyBeingEdited ? null : ( // Disable editing multiple images till I figure out how to delete the images from cloudinary when user clicks the close icon // </div> //   </div> //     </Button> //       )} //         'Update Photo' //       ) : ( //         <Spinner sx={{ color: '#7148E5' }} /> //       {isPhotoLoading ? ( //     <Button className='cursor-pointer '> //     /> //       className='absolute top-0 left-0 opacity-0 w-full h-full z-1 bg-[#494748]  cursor-pointer' //       size='2000000' //       onChange={handleFileChange} //       name='personalImg' //       accept='.jpg, .jpeg, .png' //       type='file' //     <input //   <div className='relative cursor-pointer'> //   </div> //     )} //       ) //         </div> //           /> //             onClick={() => handleRemoveImage(index)} //             fontWeight={700} //             fontSize={24} //             className=' cursor-pointer text-red-500 z-10' //             icon='ic:outline-close' //           <Icon //           /> //             className='w-[156px] h-[56px] object-cover  rounded-lg' //             alt='Preview' //             src={preview} //           <img //         <div key={index} className='flex items-center'> //       (preview, index) => ( //     {propertyBeingEdited?.property_images?.map( //   <div className='w-full  h-[156px] border-2 border-dashed border-[#B5BDC9] flex items-center flex-wrap justify-center   '> // <div className='mr-4 w-full flex items-center gap-4 '>
                <div>
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

                        <div className='bg-[#F1F2F6] w-full  h-[156px] border-2 border-dashed border-[#B5BDC9] rounded-[8px] mb-4 text-center cursor-pointer pt-[20px] lg:pt-[20px] lg:px-[64px] lg:pb-[0px]'>
                          {isPhotoLoading ? (
                            <Spinner sx={{ color: '#7148E5' }} />
                          ) : (
                            <Icon
                              icon='ep:upload-filled'
                              fontSize={48}
                              className='text-center mx-auto'
                            />
                          )}

                          <div className=' mx-auto mt-[4px]'>
                            <Typography
                              sx={{ color: '#1A3A50', fontSize: '14px' }}
                            >
                              Upload Multiple images
                            </Typography>
                            <Typography
                              sx={{ color: '#526581', fontSize: '12px' }}
                            >
                              File type: .PNG or JPG
                            </Typography>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <Checkbox
              label={
                <Typography
                  variant='small'
                  color='gray'
                  className='flex items-center font-normal'
                >
                  I agree the
                  <a
                    href='#'
                    className='font-medium transition-colors hover:text-gray-900'
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: '-ml-2.5' }}
            />
            <Button className='mt-6' fullWidth type='submit'>
              {loading ? (
                <Spinner />
              ) : propertyBeingEdited ? (
                'Update Property'
              ) : (
                'Add porperty'
              )}
            </Button>
          </form>
        </Card>
      </Layout>
    </>
  );
};

export default AddNewListing;
