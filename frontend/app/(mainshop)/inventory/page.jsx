'use client'
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogCancel,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import AddMedicineModal from '@/components/AddMedicalModal';



const Inventory = () => {
  const [medicines, setMedicines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shopdata, setShopdata] = useState({})
  const [editQuantity, setEditQuantity] = useState(""); // State for storing the edited quantity
  // Example shop ID, set this accordingly
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // New state for edit modal
  const [currentMedicineId, setCurrentMedicineId] = useState(null);
  const router = useRouter();


  const handleSaveChanges = async (medId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/loginshop');
      return;
    }
    setLoading(true);

    try {
      const response = await axios.put(`http://localhost:5000/shop/medicines/${medId}`,
        { quantity: editQuantity },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

      if (response.status === 200) {
        console.log("Edited successful");
        const fetchMedicines = async () => {

          try {
            const response = await axios.get('http://localhost:5000/shop/medicines', {
              headers: {
                'Authorization': `Bearer ${token}`, // Include the JWT token
                'Content-Type': 'application/json',  // Specify content type
              },
            });
            if (response.data && response.data.medicines) {
              setMedicines(response.data.medicines); // Set the medicines in state
            } else {
              console.error("No medicines found in the response");
            }
          } catch (error) {
            console.error("Failed to fetch medicines", error);
          }
        };
        fetchMedicines();
        setLoading(false);
        setEditQuantity(""); 
        setIsEditModalOpen(false); 
      }
    } catch (error) {
      console.error("Failed to update medicine", error);
    }
  };


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/loginshop'); 
      return; 
    }

    const fetchshop = async () => {
      try {
        const response = await axios.get('http://localhost:5000/shop', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',  
          },
        });
        if (response.data && response.data.shop) {
          setShopdata(response.data.shop); 
        } else {
          console.error("No Shop found in the response");
        }
      } catch (error) {
        console.error("Failed to fetch shop", error);
      }

    };
    const fetchMedicines = async () => {

      try {
        const response = await axios.get('http://localhost:5000/shop/medicines', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',  
          },
        });
        if (response.data && response.data.medicines) {
          setMedicines(response.data.medicines); 
        }else{
          console.error("No medicines found in the response");
        }
      } catch (error) {
        console.error("Failed to fetch medicines", error);
      }
    };

    fetchshop();
    fetchMedicines();
  }, []);

  const handleMedicineAdded = (newMedicine) => {
    setMedicines((prevMedicines) => [...prevMedicines, newMedicine]);
  };

  const handleDeleteMedicine = async (medicineId) => {
    try {
      await axios.delete(`http://localhost:5000/shop/medicines/${medicineId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token here
        },
      });
      setMedicines((prevMedicines) => prevMedicines.filter(medicine => medicine.id !== medicineId));
    } catch (error) {
      console.error("Failed to delete medicine", error);
    }

  };


  return (
    <div className='bg-[#f5f5f5] w-full min-h-screen shadow-inner'>
      <h1 className='font-bold text-neutral-800 text-4xl py-3 px-4 bg-lime-200 lg:bg-transparent justify-between items-center flex shadow-md pb-4 lg:shadow-none rounded-b-md'>
        Inventory
        <div className='lg:hidden'>
          <HoverCard>
            <HoverCardTrigger>
              <div className='w-10 h-10 rounded-full bg-black'></div>
            </HoverCardTrigger>
            <HoverCardContent>
              <p className='font-semibold'>Username</p>
              <p className='text-gray-900 text-sm'>email@gmail.com</p>
              <p className='text-xs text-gray-500'>You can edit your profile from here.</p>
            </HoverCardContent>
          </HoverCard>
        </div>
      </h1>
      <div className='pt-2 lg:px-4 px-2 h-full'>
        <div className='flex flex-col gap-3 h-full'>
          <div className='bg-white shadow-md min-h-1/5 max-w-full py-3 lg:px-7 px-3 gap-4 rounded-md flex justify-between items-center'>
            <div>
              <h2 className='text-lg font-bold'>{shopdata.shop_name}</h2>
              <h2 className='text-sm font-semibold text-gray-600'>{shopdata.location},&nbsp;{shopdata.pincode}</h2>
              <h3 className='text-sm text-gray-500'>{shopdata.city}</h3>
            </div>
            <div className='flex lg:flex-row flex-col gap-2 lg:gap-3'>
              <Button
                className='hover:bg-white text-xs lg:text-sm gap-2 py-2 px-2 border-2 flex items-center justify-center bg-green-500 text-white border-green-500 rounded-sm lg:py-5 hover:text-green-500 lg:px-4'
                onClick={() => setIsModalOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Item
              </Button>
              {isModalOpen && (
                <AddMedicineModal
                  className="z-40"
                  onClose={() => setIsModalOpen(false)}
                  onMedicineAdded={handleMedicineAdded}
                />
              )}

            </div>
          </div>
          <div className='bg-white border min-h-4/5 max-w-full py-3 px-4 rounded-md'>
            <Table>
              <TableCaption className='text-gray-400 pt-3'>List of your medicine stock.</TableCaption>
              <TableHeader>
                <TableRow className='hover:bg-white'>
                  <TableHead className="w-[150px]">Medicine Name</TableHead>
                  <TableHead>Order Count</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Price (in Rs.)</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicines.length > 0 ? (
                  medicines.map((medicine) => (
                    <TableRow key={medicine.id} className="hover:bg-gray-100">
                      <TableCell className="font-medium">{medicine.name}</TableCell>
                      <TableCell>{medicine.orderCount}</TableCell>
                      <TableCell>{medicine.quantity}</TableCell>
                      <TableCell className="text-right">{medicine.price}</TableCell>
                      <TableCell className="flex justify-end lg:gap-3 gap-2 items-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="bg-amber-500 text-white p-1 rounded-[10px] lg:h-10 lg:w-10 h-7 w-7 text-xs lg:text-sm shadow-sm hover:bg-amber-700"
                              onClick={() => setIsEditModalOpen(true)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"className="size-4">
                                <path fill-rule="evenodd" d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z" clip-rule="evenodd" />
                              </svg>

                            </Button>
                          </DialogTrigger>
                          {isEditModalOpen && 
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit Quantity</DialogTitle>
                              <DialogDescription>
                                Make changes to your medcine's quantity here. Click save when you're done.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-2 py-4">

                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                  <p className='flex'>New Quantity</p>
                                </Label>
                                <Input
                                  id="quantity"
                                  value={editQuantity} // Bind input to state
                                  onChange={(e) => setEditQuantity(e.target.value)} // Update state on change
                                  className="col-span-3 bg-slate-200 border-none"
                                  placeholder="Enter the quantity here..."
                                />

                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="button" className='bg-blue-500 text-white rounded-sm hover:bg-indigo-700' onClick={() => handleSaveChanges(medicine.id)} disabled={loading}>
                                {loading ? 'Saving...' : 'Save changes'}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        }
                        </Dialog>
                        
                        <AlertDialog>
                          <AlertDialogTrigger>

                            <Button
                              className="p-1 rounded-[10px] pr-2 bg-gray-100 lg:h-10 lg:w-10 text-xs h-7 w-7 lg:text-sm flex items-center justify-center hover:bg-red-500 hover:text-white border-red-400 lg:py-5 text-red-400"

                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className='bg-white'>
                            <AlertDialogHeader>
                              <AlertDialogTitle className='font-semibold'>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription className='font-semibold text-gray-500'>
                                This action cannot be undone. This will permanently delete your medicine data
                                and remove your data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className='px-4 py-3 bg-transparent border border-neutral-800 rounded-sm hover:bg-slate-100 active:bg-slate-200'>Cancel</AlertDialogCancel>
                              <AlertDialogAction className='px-4 py-3 bg-red-500 text-white rounded-sm hover:bg-red-700 active:bg-red-900' onClick={() => handleDeleteMedicine(medicine.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableCell colSpan={5} className="text-center text-gray-700 text-sm font-semibold">No medicines available.</TableCell>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;