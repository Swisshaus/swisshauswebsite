import React from 'react';

type PropertyInfoProps = {
  address: string;
  city: string;
  area: string;
  county: string;
  country: string;
  squareFootage: string;
  propertySize: string;
  bedrooms: number;
  bathrooms: number;
  garage: string;
};

const PropertyInfo: React.FC<PropertyInfoProps> = ({
  address,
  city,
  area,
  county,
  country,
  squareFootage,
  propertySize,
  bedrooms,
  bathrooms,
  garage,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Property Details</h3>
        <hr className="border-gray-200 dark:border-gray-700 mb-4" />
        <div className="space-y-2">
          <p><span className="font-semibold">Address:</span> {address}</p>
          <p><span className="font-semibold">City:</span> {city}</p>
          <p><span className="font-semibold">Area:</span> {area}</p>
          <p><span className="font-semibold">County:</span> {county}</p>
          <p><span className="font-semibold">Country:</span> {country}</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Home Specifications</h3>
        <hr className="border-gray-200 dark:border-gray-700 mb-4" />
        <div className="space-y-2">
          <p><span className="font-semibold">Square Footage:</span> {squareFootage}</p>
          <p><span className="font-semibold">Property Size:</span> {propertySize}</p>
          <p><span className="font-semibold">Bedrooms:</span> {bedrooms}</p>
          <p><span className="font-semibold">Bathrooms:</span> {bathrooms}</p>
          <p><span className="font-semibold">Garage:</span> {garage}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;