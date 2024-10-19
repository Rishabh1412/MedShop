import React from 'react';
import Medcard from './Medcard';

const Medicines = ({ medicine_data = [] }) => { // Set a default empty array if medicine_data is undefined
    return (
        <>
            <div>
                <div className="container mx-auto py-4 px-2 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                        {medicine_data.length > 0 ? (
                            medicine_data.map((medicine) => (
                                <Medcard key={medicine.medicine_id} medicine={medicine} />
                            ))
                        ) : (
                            <p className='text-center w-full'>No medicines available</p> // Display this if there are no medicines
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Medicines;
