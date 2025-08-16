/* eslint-disable react/prop-types */

import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../../../components/layout/Layout';
import { formatDate } from '../../../../utils/helper';

const TenancyRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { tenancyRequests } = location.state || {};
  const request = tenancyRequests?.find((r) => r._id === id);

  if (!request) {
    return (
      <Layout>
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
          <div className='text-center p-8 bg-white rounded-xl shadow-lg max-w-md mx-auto'>
            <div className='w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center'>
              <svg
                className='w-8 h-8 text-red-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              Request Not Found
            </h3>
            <p className='text-gray-600 mb-6'>
              The tenancy request you&apos;re looking for could not be found.
            </p>
            <button
              onClick={() => navigate(-1)}
              className='inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200'
            >
              <svg
                className='w-4 h-4 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10 19l-7-7m0 0l7-7m-7 7h18'
                />
              </svg>
              Go Back
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='min-h-screen bg-gray-50 py-8'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Header */}
          <div className='mb-8'>
            <button
              onClick={() => navigate(-1)}
              className='inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors duration-200'
            >
              <svg
                className='w-4 h-4 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10 19l-7-7m0 0l7-7m-7 7h18'
                />
              </svg>
              Back to Requests
            </button>
            <h1 className='text-3xl font-bold text-gray-900'>
              Tenancy Request Details
            </h1>
            <p className='text-gray-600 mt-1'>
              Complete information for tenancy application
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Main Content */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Personal Information */}
              <Section title='Personal Information' icon='user'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Detail label='First Name' value={request.firstName} />
                  <Detail label='Last Name' value={request.lastName} />
                  <Detail label='Email Address' value={request.email} />
                  <Detail label='Phone Number' value={request.phoneNumber} />
                  <Detail
                    label='State of Origin'
                    value={request.stateOfOrigin}
                  />
                  <Detail label='LGA' value={request.lga} />
                  <Detail label='Nationality' value={request.nationality} />
                  <Detail label='Religion' value={request.religion} />
                </div>
              </Section>

              {/* Address Information */}
              <Section title='Address Information' icon='home'>
                <div className='space-y-6'>
                  <Detail
                    label='Home Town Address'
                    value={request.addressOfHomeTown}
                  />
                  <Detail
                    label='Current Residential Address'
                    value={request.residentialAddress}
                  />
                  <Detail
                    label="Relative's Address"
                    value={request.addressOfRelative}
                  />
                </div>
              </Section>

              {/* Employment Information */}
              <Section title='Employment Information' icon='briefcase'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Detail label='Occupation' value={request.occupation} />
                  <Detail label='Designation' value={request.designation} />
                  <div className='md:col-span-2'>
                    <Detail label='Company Name' value={request.companyName} />
                  </div>
                  <div className='md:col-span-2'>
                    <Detail
                      label='Company Address'
                      value={request.companyAddress}
                    />
                  </div>
                </div>
              </Section>

              {/* Tenancy Details */}
              <Section title='Tenancy Details' icon='key'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Detail
                    label='Apartment Type'
                    value={request.apartmentType}
                  />
                  <Detail
                    label='Number of Occupants'
                    value={request.numberOfOccupants}
                  />
                  <Detail label='Rent Payer' value={request.rentPayer} />
                  <Detail
                    label='Application Date'
                    value={
                      request.createdAt ? formatDate(request.createdAt) : '—'
                    }
                  />
                  <div className='md:col-span-2'>
                    <Detail
                      label='Reason for Relocation'
                      value={request.relocationReason}
                    />
                  </div>
                </div>
              </Section>

              {/* Guarantor Information */}
              <Section title='Guarantor Information' icon='shield'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Detail
                    label='Guarantor Name'
                    value={request.guarantorName}
                  />
                  <Detail
                    label='Guarantor Phone'
                    value={request.gurantorPhoneNumber}
                  />
                  <Detail
                    label='Relationship'
                    value={request.natureOfRelationship}
                  />
                </div>
              </Section>
            </div>

            {/* Sidebar */}
            <div className='lg:col-span-1'>
              <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                  Application Summary
                </h3>

                {request.tenantImage?.url && (
                  <div className='mb-6'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Applicant Photo
                    </label>
                    <img
                      src={request.tenantImage.url}
                      alt='Tenant'
                      className='w-full h-48 object-cover rounded-lg border border-gray-200'
                    />
                  </div>
                )}

                <div className='space-y-4'>
                  <div className='flex items-center justify-between py-2 border-b border-gray-200'>
                    <span className='text-sm text-gray-600'>Status</span>
                    <span className='px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full'>
                      Pending Review
                    </span>
                  </div>

                  <div className='flex items-center justify-between py-2 border-b border-gray-200'>
                    <span className='text-sm text-gray-600'>
                      Application ID
                    </span>
                    <span className='text-sm font-mono text-gray-900'>
                      #{id?.slice(-8)}
                    </span>
                  </div>

                  <div className='flex items-center justify-between py-2'>
                    <span className='text-sm text-gray-600'>Submitted</span>
                    <span className='text-sm text-gray-900'>
                      {request.createdAt ? formatDate(request.createdAt) : '—'}
                    </span>
                  </div>
                </div>

                <div className='mt-6 pt-6 border-t border-gray-200'>
                  <button
                    disabled
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 mb-3'
                  >
                    Approve Request
                  </button>
                  <button
                    disabled
                    className='w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200'
                  >
                    Request More Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Section = ({ title, icon, children }) => {
  const getIcon = (iconName) => {
    const icons = {
      user: (
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
        />
      ),
      home: (
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
        />
      ),
      briefcase: (
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V8m8 0V6a2 2 0 00-2-2H10a2 2 0 00-2 2v2'
        />
      ),
      key: (
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
        />
      ),
      shield: (
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
        />
      ),
    };
    return icons[iconName] || icons.user;
  };

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
      <div className='flex items-center mb-6'>
        <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3'>
          <svg
            className='w-4 h-4 text-blue-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            {getIcon(icon)}
          </svg>
        </div>
        <h2 className='text-xl font-semibold text-gray-900'>{title}</h2>
      </div>
      {children}
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className='space-y-1'>
    <label className='block text-sm font-medium text-gray-700'>{label}</label>
    <div className='text-base text-gray-900 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200'>
      {value || '—'}
    </div>
  </div>
);

export default TenancyRequestDetail;
