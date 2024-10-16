import React from 'react'
import Medcard from './Medcard'

const Medicines = () => {
    const medicine_data = [
        {
            "medicine_id": 1,
            "name": "Paracetamol",
            "category": "Analgesic",
            "manufacturer": "Cipla Ltd",
            "price": 25.00,
            "stock": 100,
            "description": "Used to treat mild to moderate pain and fever.",
            "favourite": "1",
            "shop_name": "Health Plus Pharmacy",
            "shop_address": "123 Main St, Cityville",
            'rating':4.5
        },
        {
            "medicine_id": 2,
            "name": "Amoxicillin",
            "category": "Antibiotic",
            "manufacturer": "GlaxoSmithKline",
            "price": 60.50,
            "stock": 50,
            "description": "Treats bacterial infections such as pneumonia and bronchitis.",
            "favourite": "0",
            "shop_name": "Care Pharmacy",
            "shop_address": "456 High St, Townsville",
            'rating': 4.5
            
        },
        {
            "medicine_id": 3,
            "name": "Ibuprofen",
            "category": "Anti-inflammatory",
            "manufacturer": "Sun Pharmaceuticals",
            "price": 30.00,
            "stock": 150,
            "description": "Commonly used for pain relief, fever reduction, and inflammation.",
            "favourite": "1",
            "shop_name": "Wellness Store",
            "shop_address": "789 Elm St, Villageburg",
            'rating': 4.5
        },
        {
            "medicine_id": 4,
            "name": "Cetirizine",
            "category": "Antihistamine",
            "manufacturer": "Zydus Cadila",
            "price": 15.00,
            "stock": 200,
            "description": "Relieves allergy symptoms such as runny nose, sneezing, and itching.",
            "favourite": "1",
            "shop_name": "Family Health Pharmacy",
            "shop_address": "321 Oak St, Cityville",
            'rating': 4.6
        },
        {
            "medicine_id": 5,
            "name": "Metformin",
            "category": "Anti-diabetic",
            "manufacturer": "Torrent Pharmaceuticals",
            "price": 45.00,
            "stock": 120,
            "description": "Helps control blood sugar levels in people with type 2 diabetes.",
            "favourite": "0",
            "shop_name": "Diabetes Care Pharmacy",
            "shop_address": "654 Pine St, Townsville",
            'rating': 4.9
        },
        {
            "medicine_id": 6,
            "name": "Atorvastatin",
            "category": "Cholesterol-lowering",
            "manufacturer": "Dr. Reddy's Laboratories",
            "price": 80.00,
            "stock": 75,
            "description": "Used to lower cholesterol and triglycerides in the blood.",
            "favourite": "0",
            "shop_name": "Heart Health Pharmacy",
            "shop_address": "987 Maple St, Villageburg",
            'rating': 4.3
        },
        {
            "medicine_id": 7,
            "name": "Azithromycin",
            "category": "Antibiotic",
            "manufacturer": "Ranbaxy Laboratories",
            "price": 120.00,
            "stock": 40,
            "description": "Treats a wide variety of bacterial infections.",
            "favourite": "1",
            "shop_name": "City Pharmacy",
            "shop_address": "135 Birch St, Cityville",
            'rating': 4.2
        },
        {
            "medicine_id": 8,
            "name": "Aspirin",
            "category": "Blood thinner",
            "manufacturer": "Bayer Pharmaceuticals",
            "price": 10.00,
            "stock": 300,
            "description": "Used to reduce fever, pain, and inflammation. Also used as a blood thinner.",
            "favourite": "1",
            "shop_name": "Wellness Pharmacy",
            "shop_address": "246 Cedar St, Townsville",
            'rating': 4.6
        },
        {
            "medicine_id": 9,
            "name": "Loratadine",
            "category": "Antihistamine",
            "manufacturer": "Mylan",
            "price": 18.00,
            "stock": 180,
            "description": "Treats allergy symptoms, including hay fever and hives.",
            "favourite": "1",
            "shop_name": "Allergy Relief Pharmacy",
            "shop_address": "357 Spruce St, Villageburg",
            'rating': 4.8
        },
        {
            "medicine_id": 10,
            "name": "Omeprazole",
            "category": "Antacid",
            "manufacturer": "Pfizer",
            "price": 50.00,
            "stock": 90,
            "description": "Reduces stomach acid and treats conditions like GERD.",
            "favourite": "0",
            "shop_name": "Gastro Health Pharmacy",
            "shop_address": "468 Willow St, Cityville",
            'rating': 4.0
        }
    ];


    return (
        <>
            <div>
                <div className="container mx-auto py-4 px-2 rounded-md">
                    
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                        {medicine_data.map((medicine) => (
                            <Medcard key={medicine.medicine_id} medicine={medicine} />
                            
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Medicines