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
  Card,
  CardBody,
  Progress,
} from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import countries from '../../../utils/countries.json';
import { states } from '../../../utils/states';
import { 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  X, 
  MapPin, 
  Home, 
  DollarSign,
  Camera
} from 'lucide-react';
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
  const dispatch = useDispatch();

  // Form state
  const [currentStep, setCurrentStep] = useState(1);
  const [country, setCountry] = useState(propertyBeingEdited?.country || 'Nigeria');
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [state, setState] = useState(propertyBeingEdited?.state || '');
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState(
    propertyBeingEdited?.property_details?.property_type || ''
  );

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const { handleSubmit, register, setValue, watch, trigger, formState: { errors } } = useForm({
    mode: 'onChange',
    defaultValues: {
      propertyName: propertyBeingEdited?.property_name || '',
      propertyDescription: propertyBeingEdited?.property_description || '',
      address: propertyBeingEdited?.address || '',
      country: propertyBeingEdited?.country || 'Nigeria',
      state: propertyBeingEdited?.state || '',
      city: propertyBeingEdited?.city || '',
      propertyType: propertyBeingEdited?.property_details?.property_type || '',
      propertyRoom: propertyBeingEdited?.property_details?.property_beds || '',
      propertyToilet: propertyBeingEdited?.property_details?.property_toilets || '',
      propertyBath: propertyBeingEdited?.property_details?.property_baths || '',
      propertyArea: propertyBeingEdited?.property_details?.property_area || '',
      propertyStatus: propertyBeingEdited?.property_details?.property_status || '',
      propertyPrice: propertyBeingEdited?.property_details?.property_price || '',
    },
  });

  const watchedValues = watch();

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

  const steps = [
    {
      id: 1,
      title: 'Basic Information',
      icon: Home,
      fields: ['propertyName', 'propertyDescription', 'propertyType']
    },
    {
      id: 2,
      title: 'Location Details',
      icon: MapPin,
      fields: ['address', 'country', 'state', 'city']
    },
    {
      id: 3,
      title: 'Property Details',
      icon: DollarSign,
      fields: ['propertyRoom', 'propertyToilet', 'propertyBath', 'propertyArea', 'propertyStatus', 'propertyPrice']
    },
    {
      id: 4,
      title: 'Images & Media',
      icon: Camera,
      fields: []
    }
  ];

  useEffect(() => {
    if (propertyBeingEdited) {
      setValue('propertyName', propertyBeingEdited?.property_name || '');
      setValue('propertyDescription', propertyBeingEdited?.property_description || '');
      setValue('address', propertyBeingEdited?.address || '');
      setValue('country', propertyBeingEdited?.country || 'Nigeria');
      setValue('state', propertyBeingEdited?.state || '');
      setValue('city', propertyBeingEdited?.city || '');
      setValue('propertyType', propertyBeingEdited?.property_details?.property_type || '');
      setValue('propertyRoom', propertyBeingEdited?.property_details?.property_beds || '');
      setValue('propertyToilet', propertyBeingEdited?.property_details?.property_toilets || '');
      setValue('propertyBath', propertyBeingEdited?.property_details?.property_baths || '');
      setValue('propertyArea', propertyBeingEdited?.property_details?.property_area || '');
      setValue('propertyStatus', propertyBeingEdited?.property_details?.property_status || '');
      setValue('propertyPrice', propertyBeingEdited?.property_details?.property_price || '');
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    // Clear the input value to allow re-uploading the same file
    e.target.value = '';
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      // Add new files to existing imageFiles array
      setImageFiles((prevFiles) => [...prevFiles, ...files]);
      
      // Create previews for new files only
      const newPreviews = files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        isNew: true // Flag to distinguish new files from existing ones
      }));
      
      // Add new previews to existing ones
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
    // Clear the input value to allow re-uploading
    event.target.value = '';
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleClearFeatureImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleNextStep = async (e) => {
    // Prevent form submission
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const currentFields = steps[currentStep - 1].fields;
    if (currentFields.length > 0) {
      const isValid = await trigger(currentFields);
      if (!isValid) return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = (e) => {
    // Prevent form submission
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = async (stepNumber) => {
    if (stepNumber <= currentStep) {
      setCurrentStep(stepNumber);
    } else {
      // Validate all previous steps before allowing jump forward
      let canProceed = true;
      for (let i = 1; i < stepNumber; i++) {
        const stepFields = steps[i - 1].fields;
        if (stepFields.length > 0) {
          const isStepValid = await trigger(stepFields);
          if (!isStepValid) {
            canProceed = false;
            break;
          }
        }
      }
      if (canProceed) {
        setCurrentStep(stepNumber);
      }
    }
  };

  const handleCreateProperty = async (data) => {
    // Prevent multiple submissions
    if (loading) return;
    
    setLoading(true);
    
    try {
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
        showToastMessage('Property updated successfully');
        navigate(ROUTES.realtorsProperties);
      } else {
        await dispatch(addProperty(submitData)).unwrap();
        showToastMessage('Property added successfully');
        navigate(ROUTES.realtorsProperties);
      }
    } catch (error) {
      showErrorMessage(
        error?.response?.data?.message || 'Error processing property'
      );
    } finally {
      setLoading(false);
    }
  };

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="propertyName" className="block text-sm font-medium text-gray-700 mb-2">
          Property Name *
        </label>
        <Input
          size="lg"
          className="!border-t-indigo-300"
          name="propertyName"
          type="text"
          {...register('propertyName', { required: 'Property name is required' })}
        />
        {errors.propertyName && (
          <p className="mt-1 text-sm text-red-600">{errors.propertyName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
          Property Type *
        </label>
        <Select
          name="propertyType"
          onChange={(type) => {
            setPropertyType(type);
            setValue('propertyType', type);
          }}
          value={propertyType}
          className="!border-t-indigo-300"
        >
          {propertyTypeList.map((item) => (
            <Option value={item} key={item}>
              {item}
            </Option>
          ))}
        </Select>
      </div>

      <div>
        <label htmlFor="propertyDescription" className="block text-sm font-medium text-gray-700 mb-2">
          Property Description
        </label>
        <Textarea
          rows="4"
          size="lg"
          className="!border-t-indigo-300"
          name="propertyDescription"
          {...register('propertyDescription')}
        />
      </div>
    </div>
  );

  const renderLocationDetails = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Address *
        </label>
        <Input
          size="lg"
          className="!border-t-indigo-300"
          type="text"
          name="address"
          {...register('address', { required: 'Address is required' })}
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
            Country *
          </label>
          <Select
            name="country"
            onChange={(selectedCountry) => {
              setCountry(selectedCountry);
              setValue('country', selectedCountry);
            }}
            value={country}
            className="!border-t-indigo-300"
          >
            {countries &&
              countries.map((item) => (
                <Option value={item.name} key={item.name}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          {country === 'Nigeria' ? (
            <Select
              name="state"
              onChange={(selectedState) => {
                setState(selectedState);
                setValue('state', selectedState);
              }}
              value={state}
              className="!border-t-indigo-300"
            >
              {states.map((item) => (
                <Option value={item} key={item}>
                  {item}
                </Option>
              ))}
            </Select>
          ) : (
            <Input
              size="lg"
              className="!border-t-indigo-300"
              type="text"
              name="state"
              {...register('state', { required: 'State is required' })}
            />
          )}
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <Input
            size="lg"
            className="!border-t-indigo-300"
            type="text"
            name="city"
            {...register('city', { required: 'City is required' })}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderPropertyDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="propertyRoom" className="block text-sm font-medium text-gray-700 mb-2">
            Number of Rooms
          </label>
          <Input
            size="lg"
            className="!border-t-indigo-300"
            type="text"
            name="propertyRoom"
            placeholder="1, 2, 3"
            {...register('propertyRoom')}
          />
        </div>

        <div>
          <label htmlFor="propertyToilet" className="block text-sm font-medium text-gray-700 mb-2">
            Number of Toilets
          </label>
          <Input
            size="lg"
            className="!border-t-indigo-300"
            type="text"
            name="propertyToilet"
            placeholder="1, 2, 3"
            {...register('propertyToilet')}
          />
        </div>

        <div>
          <label htmlFor="propertyBath" className="block text-sm font-medium text-gray-700 mb-2">
            Number of Bathrooms
          </label>
          <Input
            size="lg"
            className="!border-t-indigo-300"
            type="text"
            name="propertyBath"
            placeholder="1, 2, 3"
            {...register('propertyBath')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="propertyArea" className="block text-sm font-medium text-gray-700 mb-2">
            Property Size
          </label>
          <Input
            size="lg"
            className="!border-t-indigo-300"
            type="text"
            name="propertyArea"
            placeholder="Square feet"
            {...register('propertyArea')}
          />
        </div>

        <div>
          <label htmlFor="propertyStatus" className="block text-sm font-medium text-gray-700 mb-2">
            Property Status
          </label>
          <Input
            size="lg"
            className="!border-t-indigo-300"
            type="text"
            name="propertyStatus"
            placeholder="For rent, for sale"
            {...register('propertyStatus')}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="propertyPrice" className="block text-sm font-medium text-gray-700 mb-2">
            Price *
          </label>
          <Input
            size="lg"
            className="!border-t-indigo-300"
            type="number"
            name="propertyPrice"
            placeholder="Enter price"
            {...register('propertyPrice', { required: 'Price is required' })}
          />
          {errors.propertyPrice && (
            <p className="mt-1 text-sm text-red-600">{errors.propertyPrice.message}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderImagesMedia = () => (
    <div className="space-y-8">
      {/* Feature Image Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Feature Image
        </label>
        
        {propertyBeingEdited ? (
          <div className="flex items-center gap-4">
            <div>
              <img
                alt="property"
                src={imagePreview || propertyBeingEdited?.feature_image?.url}
                className="h-[72px] w-[72px] rounded-lg object-cover"
              />
            </div>
            <div className="relative cursor-pointer">
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                name="feature_image"
                onChange={handleFileChange}
                className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
              />
              <Button type="button" className="cursor-pointer">
                {isPhotoLoading ? <Spinner /> : 'Update Photo'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative">
            {imagePreview ? (
              <div className="flex items-center gap-4">
                <img
                  alt="property"
                  src={imagePreview}
                  className="h-40 w-40 object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="outlined"
                  color="red"
                  className="flex items-center gap-2"
                  onClick={handleClearFeatureImage}
                >
                  <X size={16} />
                  Remove
                </Button>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  name="feature_image"
                  onChange={handleFileChange}
                  className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer z-10"
                />
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors cursor-pointer">
                  {isPhotoLoading ? (
                    <Spinner />
                  ) : (
                    <div className="space-y-2 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-500">
                          Upload feature image
                        </span>
                        <p className="mt-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG or JPG up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Additional Images Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Additional Images
        </label>

        {imagePreviews?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview.url || preview}
                  alt="Preview"
                  className="h-24 w-full rounded-lg object-cover"
                />
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                  onClick={() => handleRemoveImage(index)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="relative">
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleImageChange}
            className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer z-10"
            disabled={imagePreviews?.length >= 4}
            multiple
            name="property_images[]"
          />
          
          {imagePreviews?.length > 0 ? (
            <div>
              <Button
                type="button"
                className="cursor-pointer"
                disabled={imagePreviews?.length >= 4}
              >
                {isPhotoLoading ? <Spinner /> : 'Add more images'}
              </Button>
              <Typography className="mt-2 text-red-500 text-sm">
                Maximum 4 images
              </Typography>
            </div>
          ) : (
            <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors cursor-pointer">
              {isPhotoLoading ? (
                <Spinner />
              ) : (
                <div className="space-y-2 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-500">
                      Upload additional images
                    </span>
                    <p className="mt-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG or JPG up to 10MB each</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Terms and Conditions */}
      {!propertyBeingEdited && (
        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
            I agree to the Terms and Conditions
          </label>
        </div>
      )}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderBasicInfo();
      case 2:
        return renderLocationDetails();
      case 3:
        return renderPropertyDetails();
      case 4:
        return renderImagesMedia();
      default:
        return renderBasicInfo();
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {propertyBeingEdited ? 'Edit Property' : 'Add New Property'}
          </h1>
          <p className="text-gray-600">
            Complete all steps to list your property
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step) => {
              const StepIcon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              
              return (
                <div
                  key={step.id}
                  className={`flex items-center cursor-pointer ${
                    step.id !== steps.length ? 'flex-1' : ''
                  }`}
                  onClick={() => handleStepClick(step.id)}
                >
                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        isActive
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : isCompleted
                          ? 'bg-green-600 border-green-600 text-white'
                          : 'bg-white border-gray-300 text-gray-500'
                      }`}
                    >
                      <StepIcon size={20} />
                    </div>
                    <div className="ml-3">
                      <p
                        className={`text-sm font-medium ${
                          isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {step.id !== steps.length && (
                    <div
                      className={`flex-1 h-0.5 ml-4 ${
                        isCompleted ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          
          <Progress 
            value={progressPercentage} 
            color="indigo"
            className="h-2"
          />
          
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
        </div>

        {/* Form Content */}
        <Card>
          <CardBody>
            <form onSubmit={handleSubmit(handleCreateProperty)} className="space-y-6">
              <div key={`step-${currentStep}`}>
              {renderStepContent()}
              </div>
              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <div>
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outlined"
                      className="flex items-center gap-2"
                      onClick={handlePreviousStep}
                    >
                      <ChevronLeft size={16} />
                      Previous
                    </Button>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="text"
                    color="gray"
                    onClick={() => navigate(ROUTES.realtorsProperties)}
                  >
                    Cancel
                  </Button>
                  
                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
                      onClick={handleNextStep}
                    >
                      Next
                      <ChevronRight size={16} />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner size="sm" />
                      ) : propertyBeingEdited ? (
                        'Update Property'
                      ) : (
                        'Add Property'
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default AddNewListing;