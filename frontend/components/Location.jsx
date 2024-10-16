"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Lottie from 'lottie-react';
import LocationAnimation from '/lib/LocationAnimation.json'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

// Example locations (saved by user)


export function Location() {
    const locations = [
        {
            value: "home",
            label: "Home - 123 Main St, New York, NY, USA",
        },
        {
            value: "work",
            label: "Work - 456 Office Park, Los Angeles, CA, USA",
        },
        {
            value: "parents",
            label: "Parents' House - 789 Sunset Blvd, Toronto, Ontario, Canada",
        },
        {
            value: "friend",
            label: "Friend's House - 101 Pine St, London, England, UK",
        },
    ];
    const [open, setOpen] = React.useState(false);
    const [selectedLocation, setSelectedLocation] = React.useState(""); // Store selected location

    return (
        <>
            <div className="flex items-center justify-between pl-3 w-full">
                <div className='flex items-center justify-evenly gap-4'>
                    {/* Location Display */}
                    <Lottie animationData={LocationAnimation} className='w-16' loop={true} />
                    <div className='cursor-pointer'>
                        <h3 className="text-black text-lg font-bold flex items-center">Deliver to</h3>

                        {/* Location Selection Popover */}
                        <Popover open={open} onOpenChange={setOpen} >
                            <PopoverTrigger asChild className='flex items-center text-xs lg:text-sm'>
                                <div>
                                    {selectedLocation ? selectedLocation : "Select Location..."}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-[250px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search location..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty className='text-sm'>No location found.</CommandEmpty>
                                        <CommandGroup>
                                            {locations.map((location) => (
                                                <CommandItem
                                                    key={location.value}
                                                    value={location.value}
                                                    onSelect={() => {
                                                        setSelectedLocation(location.label); // Update the displayed location
                                                        setOpen(false); // Close the dropdown
                                                    }}
                                                >
                                                    {location.label}
                                                    <CheckIcon
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            selectedLocation === location.label ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    
                </div>
                <div className='lg:hidden flex'>
                    <HoverCard>
                        <HoverCardTrigger><div className='w-12 h-12 rounded-full bg-black' ></div></HoverCardTrigger>
                        <HoverCardContent>
                            <p className=' font-semibold'>Username</p>
                            <p className='text-gray-900 text-sm'>email@gmail.com</p>
                            <p className='text-xs text-gray-500'>You can edit your profile from here.</p>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </div>
        </>
    );
}
