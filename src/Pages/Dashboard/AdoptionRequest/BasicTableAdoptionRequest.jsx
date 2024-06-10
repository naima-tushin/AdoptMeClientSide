import useAuth from '@/Hooks/useAuth';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
import React, { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function BasicTableAdoptionRequest() {
    const { user } = useAuth();
    const [MyDonations, setMyDonation] = useState([]);

    useEffect(() => {
        const fetchMyAdoptionRequest = async () => {
            try {
                const response = await fetch(`https://pet-adoption-server-side-two.vercel.app/myAdoptionRequest/${user?.email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch donations');
                }
                const data = await response.json();
                console.log(data);
                setMyDonation(data);
            } catch (error) {
                console.error('Error fetching donations:', error);
            }
        };

        fetchMyAdoptionRequest();
    }, [user?.email]);

    const acceptRejectRequest = async (id,  status) => {
        try {
            const form = { isAcceptedRequest: status };
           
                const response = await axios.put(`https://pet-adoption-server-side-two.vercel.app/acceptRejectAdoptionRequest/${id}`, form);
                if (response.status === 200) {
                    Swal.fire('Success', 'Donated amount updated successfully!', 'success');
                } else {
                    Swal.fire('Error', 'Failed to update donated amount', 'error');
                }
                window.location.reload();
        } catch (error) {
            Swal.fire('Error', 'Failed to request refund', 'error');
            console.error('Error requesting refund:', error);
        }
    };

    const data = useMemo(() => MyDonations, [MyDonations]);

    const columns = [
        {
            header: 'Serial Number',
            cell: info => info.row.index + 1,
        },
        {
            header: 'Name',
            accessorKey: 'requestorName',
            
        },
        {
            header: 'Email',
            accessorKey: 'requestorEmail',
        },
        {
            header: 'Phone Number',
            accessorKey: 'phoneNumber',
        },
        {
            header: 'Location',
            accessorKey: 'location',
        },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex space-x-2">
                   
                    <>
                   {parseInt(row.original.isAcceptedRequest ) == 0 ? ( <div><button
                        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-blue-600"
                        onClick={() => acceptRejectRequest(row.original._id, 1)}
                    >
                        Accept
                    </button>
                    <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-blue-600"
                        onClick={() => acceptRejectRequest(row.original._id, 2)}
                    >
                       Reject
                    </button></div>) : parseInt(row.original.isAcceptedRequest ) == 1 ? (<button
                        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-blue-600"
                        
                    >
                       Accepted
                    </button>) :  (<button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-blue-600"
                        
                    >
                       Rejected
                    </button>)}
                   </>
                </div>
            ),
        },
    ];

    const [sorting, setSorting] = useState([]);

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
        </div>
    );
}
