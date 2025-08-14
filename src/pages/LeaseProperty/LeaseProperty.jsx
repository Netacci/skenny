/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
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
// import countries from '../../utils/countries.json';
import { states } from '../../utils/states';
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
  User,
  Briefcase,
  Users,
} from 'lucide-react';
import {
  addProperty,
  getSingleProperty,
  uploadPropertyImage,
} from '../../redux/realtor/propertiesSlice';
import {
  showErrorMessage,
  showToastMessage,
} from '../../components/toast/toast';
import { ROUTES } from '../../utils/routes';
import Layout from '../../components/layout/Layout';

const LeaseProperty = () => {
  const navigate = useNavigate();
  const { singleProperty } = useSelector((state) => state.properties);

  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getSingleProperty(id));
  }, [dispatch, id]);

  const [currentStep, setCurrentStep] = useState(1);
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [state, setState] = useState( '');
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const totalSteps = 3;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const { handleSubmit, register, setValue, watch, trigger } = useForm({
    mode: 'onChange',
    defaultValues: {
      lastName:  '',
      firstName:  '',
      address:  '',
      phoneNumber:  '',
      stateOfOrigin:  '',
      lga:  '',
      nationality:  '',
      religion:  '',
      addressOfHomeTown:  '',
      occupation:  '',
      designation:  '',
      companyName:  '',
      companyAddress:  '',
      residentialAddress: '',
      relocationReason: '',
      numberOfOccupants: '',
      apartmentType:  '',
      rentPayer:  '',
      guarantorName:  '',
      date:  null,
      addressOfRelative:  '',
      natureOfRelationship:  '',
      gurantorPhoneNumber: '',
      tenantImage: null,
    },
  });

  const watchedValues = watch();

  const steps = [
    {
      id: 1,
      title: 'Personal Information',
      icon: User,
      fields: [
        'firstName',
        'lastName',
        'address',
        'phoneNumber',
        'stateOfOrigin',
        'lga',
        'nationality',
        'religion',
        'addressOfHomeTown',
      ],
    },
    {
      id: 2,
      title: 'Work & Residence Info',
      icon: Briefcase,
      fields: [
        'occupation',
        'designation',
        'companyName',
        'companyAddress',
        'residentialAddress',
        'relocationReason',
        'numberOfOccupants',
        'apartmentType',
        'rentPayer',
      ],
    },
    {
      id: 3,
      title: 'Guarantor Information',
      icon: Users,
      fields: [
        'guarantorName',
        'gurantorPhoneNumber',
        'addressOfRelative',
        'date',
        'natureOfRelationship',
      ],
    },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClearFeatureImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleNextStep = async () => {
    const currentFields = steps[currentStep - 1].fields;
    const isValid = await trigger(currentFields);

    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
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
        const isStepValid = await trigger(stepFields);
        if (!isStepValid) {
          canProceed = false;
          break;
        }
      }
      if (canProceed) {
        setCurrentStep(stepNumber);
      }
    }
  };

  const handleCreateProperty = async (data) => {
    setLoading(true);
    let allPublicIds = [];
    const singleFormData = new FormData();

    // Handle feature image
    if (imageFile) {
      if (imageFile instanceof File) {
        singleFormData.append('feature_image', imageFile);
      } else {
        allPublicIds.push(imageFile.public_id);
      }
    }

    try {
      let featureImageUrl;

      // Upload new feature image if it's a File
      if (imageFile instanceof File) {
        const response = await dispatch(
          uploadPropertyImage(singleFormData)
        ).unwrap();
        featureImageUrl = response.feature_image;
      } else {
        featureImageUrl = imageFile;
      }

      const submitData = {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        stateOfOrigin: data.stateOfOrigin,
        lga: data.lga,
        nationality: data.nationality,
        religion: data.religion,
        addressOfHomeTown: data.addressOfHomeTown,
        occupation: data.occupation,
        designation: data.designation,
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        residentialAddress: data.residentialAddress,
        relocationReason: data.relocationReason,
        numberOfOccupants: data.numberOfOccupants,
        apartmentType: data.apartmentType,
        rentPayer: data.rentPayer,
        guarantorName: data.guarantorName,
        date: data.date,
        addressOfRelative: data.addressOfRelative,
        natureOfRelationship: data.natureOfRelationship,
        gurantorPhoneNumber: data.gurantorPhoneNumber,
        tenantImage: JSON.stringify(featureImageUrl),
        all_public_ids: allPublicIds,
      };

    
      

  
      
        await dispatch(addProperty(submitData)).unwrap();
        setLoading(false);
        showToastMessage('Submitted successfully');
        navigate(ROUTES.realtorsProperties);
      
    } catch (error) {
      setLoading(false);
      showErrorMessage(
        error?.response?.data?.message || 'Error processing property'
      );
    }
  };

  const renderPersonalInfo = () => (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <label
            htmlFor='firstName'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            First Name *
          </label>
          <Input
            size='lg'
            className='!border-t-indigo-300'
            name='firstName'
            type='text'
            {...register('firstName', { required: 'First name is required' })}
          />
        </div>

        <div>
          <label
            htmlFor='lastName'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Last Name *
          </label>
          <Input
            size='lg'
            className='!border-t-indigo-300'
            name='lastName'
            type='text'
            {...register('lastName', { required: 'Last name is required' })}
          />
        </div>

        <div>
          <label
            htmlFor='address'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Address *
          </label>
          <Input
            size='lg'
            className='!border-t-indigo-300'
            type='text'
            name='address'
            {...register('address', { required: 'Address is required' })}
          />
        </div>

        <div>
          <label
            htmlFor='phoneNumber'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Phone Number *
          </label>
          <Input
            size='lg'
            className='!border-t-indigo-300'
            type='text'
            name='phoneNumber'
            {...register('phoneNumber', {
              required: 'Phone number is required',
            })}
          />
        </div>

        <div>
          <label
            htmlFor='stateOfOrigin'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            State of Origin *
          </label>
          <Select
            name='stateOfOrigin'
            onChange={(state) => {
              setState(state);
              setValue('stateOfOrigin', state);
            }}
            value={watchedValues.stateOfOrigin}
            className='!border-t-indigo-300'
          >
            {states.map((item) => (
              <Option value={item} key={item}>
                {item}
              </Option>
            ))}
          </Select>
        </div>

        <div>
          <label
            htmlFor='lga'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Local Government Area
          </label>
          <Input
            size='lg'
            className='!border-t-indigo-300'
            type='text'
            name='lga'
            {...register('lga')}
          />
        </div>

        <div>
          <label
            htmlFor='nationality'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Nationality
          </label>
          <Input
            size='lg'
            className='!border-t-indigo-300'
            type='text'
            name='nationality'
            {...register('nationality')}
          />
        </div>

        <div>
          <label
            htmlFor='religion'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Religion
          </label>
          <Input
            size='lg'
            className='!border-t-indigo-300'
            type='text'
            name='religion'
            {...register('religion')}
          />
        </div>

        <div className='md:col-span-2'>
          <label
            htmlFor='addressOfHomeTown'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Hometown Address
          </label>
          <Input
            size='lg'
            className='!border-t-indigo-300'
            type='text'
            name='addressOfHomeTown'
            {...register('addressOfHomeTown')}
          />
        </div>
      </div>
    </div>
  );

  const renderWorkInfo = () => (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <label
            htmlFor='occupation'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Occupation
          </label>
          <Input
            size='lg'
            className='!border-t-indigo-300'
            type='text'
            name='occupation'
            {...register('occupation')}
          />
        </div>

        <div>
          <label
            htmlFor='designation'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Designation
          </label>
          <Input
            size='lg'
            className='!border-t-indigo-300'
            type='text'
            name='designation'
            {...register('designation')}
          />
        </div>

        <div>
          <label
            htmlFor='companyName'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Company Name
          </label>
          <Input
            size='lg'
            className='!border-t-indigo-300'
            type='text'
            name='companyName'
            {...register('companyName')}
          />
        </div>

        <div>
          <label
            htmlFor='companyAddress'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Company Address
          </label>
          <Input
            size='lg'
            className='!border-t-indigo-300'
            type='text'
            name='companyAddress'
            {...register('companyAddress')}
          />
        </div>

        <div>
          <label
            htmlFor='residentialAddress'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Current Residential Address
          </label>
          <Input
            size='lg'
            className='!border-t-indigo-300'
            type='text'
            name='residentialAddress'
            {...register('residentialAddress')}
          />
        </div>

        <div>
          <label
            htmlFor='numberOfOccupants'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Number of Occupants
          </label>
          <Input
            size='lg'
            className='!border-t-indigo-300'
            type='text'
            name='numberOfOccupants'
            {...register('numberOfOccupants')}
          />
        </div>

        <div>
          <label
            htmlFor='apartmentType'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Apartment Desired (Upstairs/Downstairs)
          </label>
          <Input
            size='lg'
            className='!border-t-indigo-300'
            type='text'
            name='apartmentType'
            {...register('apartmentType')}
          />
        </div>

        <div>
          <label
            htmlFor='rentPayer'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Who will be responsible for the rent
          </label>
          <Input
            size='lg'
            className='!border-t-indigo-300'
            type='text'
            name='rentPayer'
            {...register('rentPayer')}
          />
        </div>

        <div className='md:col-span-2'>
          <label
            htmlFor='relocationReason'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Reason for relocating
          </label>
          <Textarea
            rows='3'
            size='lg'
            className='!border-t-indigo-300'
            name='relocationReason'
            {...register('relocationReason')}
          />
        </div>
      </div>
    </div>
  );

  const renderGuarantorInfo = () => (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <label
            htmlFor='guarantorName'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Guarantor Name
          </label>
          <Input
            size='lg'
            className='!border-t-indigo-300'
            type='text'
            name='guarantorName'
            {...register('guarantorName')}
          />
        </div>

        <div>
          <label
            htmlFor='gurantorPhoneNumber'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Guarantor Phone Number
          </label>
          <Input
            size='lg'
            className='!border-t-indigo-300'
            type='text'
            name='gurantorPhoneNumber'
            {...register('gurantorPhoneNumber')}
          />
        </div>

        <div>
          <label
            htmlFor='addressOfRelative'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Address of relative
          </label>
          <Input
            size='lg'
            className='!border-t-indigo-300'
            type='text'
            name='addressOfRelative'
            {...register('addressOfRelative')}
          />
        </div>

        <div>
          <label
            htmlFor='date'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Date
          </label>
          <Input
            size='lg'
            className='!border-t-indigo-300'
            type='date'
            name='date'
            {...register('date')}
          />
        </div>

        <div>
          <label
            htmlFor='natureOfRelationship'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Nature of relationship
          </label>
          <Select
            name='natureOfRelationship'
            onChange={(value) => setValue('natureOfRelationship', value)}
            value={watchedValues.natureOfRelationship}
            className='!border-t-indigo-300'
          >
            <Option value='parent'>Parent</Option>
            <Option value='sibling'>Sibling</Option>
            <Option value='spouse'>Spouse</Option>
            <Option value='friend'>Friend</Option>
            <Option value='colleague'>Colleague</Option>
            <Option value='other'>Other</Option>
          </Select>
        </div>
      </div>

      {/* Tenant Image Section */}
      <div className='mt-8'>
        <label className='block text-sm font-medium text-gray-700 mb-4'>
          Tenant Image
        </label>

    
          <div className='relative'>
            {imagePreview ? (
              <div className='flex items-center gap-4'>
                <img
                  alt='profile'
                  src={imagePreview}
                  className='h-40 w-40 object-cover rounded-lg'
                />
                <Button
                  variant='outlined'
                  color='red'
                  className='flex items-center gap-2'
                  onClick={handleClearFeatureImage}
                >
                  <X size={16} />
                  Remove
                </Button>
              </div>
            ) : (
              <div>
                <input
                  type='file'
                  accept='.jpg, .jpeg, .png'
                  name='feature_image'
                  onChange={handleFileChange}
                  className='absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer'
                />
                <div className='flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors'>
                  {isPhotoLoading ? (
                    <Spinner />
                  ) : (
                    <div className='space-y-2 text-center'>
                      <Upload className='mx-auto h-12 w-12 text-gray-400' />
                      <div className='text-sm text-gray-600'>
                        <span className='font-medium text-indigo-600 cursor-pointer hover:text-indigo-500'>
                          Upload tenant image
                        </span>
                        <p className='mt-1'>or drag and drop</p>
                      </div>
                      <p className='text-xs text-gray-500'>
                        PNG or JPG up to 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        
      </div>

      {/* Terms and Conditions */}
     
        <div className='flex items-center mt-6'>
          <input
            id='terms'
            name='terms'
            type='checkbox'
            className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
            required
          />
          <label htmlFor='terms' className='ml-2 block text-sm text-gray-900'>
            I agree to the Terms and Conditions
          </label>
        </div>

    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfo();
      case 2:
        return renderWorkInfo();
      case 3:
        return renderGuarantorInfo();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <Layout>
      <div className='max-w-4xl mx-auto px-4 py-6'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
           Tenancy Form for {singleProperty?.property_name} 
          </h1>
          <p className='text-gray-600'>
            Complete all steps to submit your tenancy application
          </p>
        </div>

        {/* Progress Bar */}
        <div className='mb-8'>
          <div className='flex justify-between items-center mb-4'>
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
                  <div className='flex items-center'>
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
                    <div className='ml-3'>
                      <p
                        className={`text-sm font-medium ${
                          isActive || isCompleted
                            ? 'text-gray-900'
                            : 'text-gray-500'
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

          <Progress value={progressPercentage} color='indigo' className='h-2' />

          <div className='flex justify-between text-sm text-gray-500 mt-2'>
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
        </div>

        {/* Form Content */}
        <Card>
          <CardBody>
            <form
              onSubmit={handleSubmit(handleCreateProperty)}
              className='space-y-6'
            >
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className='flex justify-between items-center pt-6 border-t border-gray-200'>
                <div>
                  {currentStep > 1 && (
                    <Button
                      type='button'
                      variant='outlined'
                      className='flex items-center gap-2'
                      onClick={handlePreviousStep}
                    >
                      <ChevronLeft size={16} />
                      Previous
                    </Button>
                  )}
                </div>

                <div className='flex gap-3'>
                  <Button
                    type='button'
                    variant='text'
                    color='gray'
                    onClick={() => navigate(ROUTES.realtorsProperties)}
                  >
                    Cancel
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button
                      type='button'
                      className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700'
                      onClick={handleNextStep}
                    >
                      Next
                      <ChevronRight size={16} />
                    </Button>
                  ) : (
                    <Button
                      type='submit'
                      className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700'
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner size='sm' />
                      ) : (
                        'Submit Application'
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

export default LeaseProperty;
