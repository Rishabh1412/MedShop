import Image from 'next/image';
import React from 'react';

const SearchCard = ({ data }) => {
    const isMedicine = data.type === "medicine"; // Assuming you have a 'type' property to identify the type

    return (
        <div className={`bg-white relative rounded-[25px] flex flex-col items-center hover:scale-[1.02] duration-300 overflow-hidden`}>
            <div className={`absolute top-0 left-0 text-black flex items-center justify-center font-semibold rounded-[25px] w-12 h-12 bg-white/70`}>
                {isMedicine ? <Image src={'/image.png'} width={25} height={20} alt='some-image'/> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 0 0 7.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 0 0 4.902-5.652l-1.3-1.299a1.875 1.875 0 0 0-1.325-.549H5.223Z" />
                    <path fillRule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 0 0 9.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 0 0 2.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Zm3-6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Zm8.25-.75a.75.75 0 0 0-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5.25a.75.75 0 0 0-.75-.75h-3Z" clipRule="evenodd" />
                </svg>
                } {/* M for Medicine, S for Shop */}
            </div>
            <div className="flex justify-center items-center mb-1 w-full overflow-hidden">
                <Image
                    src={'/img2.webp'}
                    className='w-full'
                    width={240}
                    height={240}
                    alt={data.name}
                    objectFit='fill'
                // Add alt text for accessibility
                />
            </div>
            <div className='w-full text-start px-3 pb-3'>
                <h3 className='font-bold text-lg text-black mb-2'>{data.name}</h3>
                {isMedicine ? (
                    <div>
                        <div className='flex justify-between text-sm text-gray-600'>
                            <p>Price: ${data.price}</p>
                            <p>Quantity: {data.quantity}</p>
                        </div>
                        {/* Additional information for medicines */}
                        <div className='mt-2 text-sm text-gray-600'>
                            <p>Manufacturer: {data.manufacturer}</p>
                            <p>Expiration Date: {data.expiration_date}</p>
                            <p>Description: {data.description}</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 className='font-semibold text-neutral-800'>{data.shop_name}</h2>
                        <div className='flex justify-between text-sm text-gray-600'>
                            <p>Location: {data.location}</p>
                            <p>Rating: {data.rating}</p>
                        </div>
                        {/* Additional information for shops */}
                        <div className='mt-2 text-sm text-gray-600'>
                            <p>Contact: {data.contact}</p>
                            <p>Open Hours: {data.open_hours}</p>
                            <p>Website: <a href={data.website} target="_blank" rel="noopener noreferrer" className='text-blue-500'>{data.website}</a></p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchCard;
