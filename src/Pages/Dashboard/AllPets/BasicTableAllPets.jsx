import { Link } from 'react-router-dom';
import useAuth from '@/Hooks/useAuth';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
import React, { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';

export default function BasicTableAllPets() {
    const { user } = useAuth();
    // State for storing the list of pets
    const [pets, setPets] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);

    // Fetch pets from the API when the component mounts or the user's email changes
    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch(`https://pet-adoption-server-side-two.vercel.app/PetListingDetails`);
                if (!response.ok) {
                    throw new Error('Failed to fetch pets');
                }
                const data = await response.json();
                console.log(data);
                setPets(data);
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        };

        fetchPets();
    }, [user?.email]);

    // Memoize the pet data to optimize rendering
    const data = useMemo(() => pets, [pets]);

    // Define the columns for the table
    const columns = [
        {
            header: 'Serial Number',
            cell: info => info.row.index + 1,
        },
        {
            header: 'Pet Name',
            accessorKey: 'petName',
        },
        {
            header: 'Pet Age',
            accessorKey: 'petAge',
        },
        {
            header: 'Pet Category',
            accessorKey: 'petCategory',
        },
        {
            header: 'Adoption Status',
            accessorKey: 'adopted',
            cell: info => info.getValue() ? 'Adopted' : 'Not Adopted',
        },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <Link className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        to={`/Dashboard/UpdatePet/${row.original._id}`}>
                        Update
                    </Link>
                    <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => {
                            setSelectedPet(row.original);
                            setShowModal(true);
                        }}
                    >
                        Delete
                    </button>
                    {row.original.adopted == false ? (
                        <button
                            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => markAsAdopted(row.original._id, true)}
                        >
                            Mark Adopted
                        </button>
                    ) : <button
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => markAsAdopted(row.original._id, false)}
                >
                    Mark Not Adopted
                </button>}
                </div>
            ),
        },
    ];

    // State for managing sorting
    const [sorting, setSorting] = useState([]);

    // Create the table instance with sorting and pagination
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { sorting },
        onSortingChange: setSorting,
        initialState: { pagination: { pageSize: 10 } }
    });

    // Function to mark a pet as adopted
    const markAsAdopted = async (id, status) => {
        try {
            const response = await fetch(`https://pet-adoption-server-side-two.vercel.app/petUpdateAdoptedStatus/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ adopted: status }),
            });

            if (!response.ok) {
                throw new Error('Failed to mark as adopted');
            }
            Swal.fire({
                title: `Status Changed`,
                text: "Marked as Adopted Successfully",
                icon: "success",
            });
            window.location.reload();

            // Update the local state
            setPets(pets.map(pet => pet.id === id ? { ...pet, adopted: true } : pet));
        } catch (error) {
            console.error('Error marking as adopted:', error);
        }
    };

    // Function to delete a pet
    const deletePet = async () => {
        try {
            if (!selectedPet) {
                console.error('No pet selected for deletion');
                return;
            }

            const response = await fetch(`https://pet-adoption-server-side-two.vercel.app/petDelete/${selectedPet._id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete pet');
            }
            Swal.fire({
                title: `${selectedPet.petName} is Deleted`,
                text: "Pet Deleted Successfully",
                icon: "success",
            });
            // Update the local state
            setPets(pets.filter(pet => pet._id !== selectedPet._id));
            setShowModal(false);
        } catch (error) {
            console.error('Error deleting pet:', error);
        }
    };

    return (
        <div className='w3-container'>
            <table className='w3-table-all'>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {{ 'asc': '⬆️', 'desc': '⬇️' }[header.column.getIsSorted() ?? null]}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>

            </table>
            {table.getPageCount() > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                    <button
                        onClick={() => table.setPageIndex(0)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        First Page
                    </button>
                    <button
                        disabled={!table.getCanPreviousPage()}
                        onClick={() => table.previousPage()}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        Previous Page
                    </button>
                    <button
                        disabled={!table.getCanNextPage()}
                        onClick={() => table.nextPage()}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        Next Page
                    </button>
                    <button
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Last Page
                    </button>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <p>Are you sure you want to delete this pet?</p>
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                No
                            </button>
                            <button
                                onClick={deletePet}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
