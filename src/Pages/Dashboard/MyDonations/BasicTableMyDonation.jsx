import useAuth from '@/Hooks/useAuth';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
import React, { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function BasicTableMyDonation() {
    const { user } = useAuth();
    const [MyDonations, setMyDonation] = useState([]);

    useEffect(() => {
        const fetchMyDonations = async () => {
            try {
                const response = await fetch(`http://localhost:5000/myDonation/${user?.email}`);
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

        fetchMyDonations();
    }, [user?.email]);

    const askForRefund = async (id, donationCampaignId, donatedAmount) => {
        try {
            const campaignResponse = await axios.get(`http://localhost:5000/donationCampaignDetailsById/${donationCampaignId}`);
            if (campaignResponse.status !== 200) {
                throw new Error('Failed to fetch campaign details');
            }
            console.log(campaignResponse.data.donatedAmount);

            const form = { donatedAmount: parseInt(campaignResponse.data.donatedAmount) - parseInt(donatedAmount) };
           
                const response = await axios.put(`http://localhost:5000/addDonatedAmount/${donationCampaignId}`, form);
                if (response.status === 200) {
                    Swal.fire('Success', 'Donated amount updated successfully!', 'success');
                } else {
                    Swal.fire('Error', 'Failed to update donated amount', 'error');
                }

            const responseDelete = await axios.delete(`http://localhost:5000/donationDelete/${id}`);
            if (responseDelete.status === 200) {
                Swal.fire('Success', 'Refund requested successfully', 'success');
                setMyDonation(prevDonations => prevDonations.filter(donation => donation._id !== id));
            } else {
                Swal.fire('Error', 'Failed to request refund', 'error');
            }
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
            header: 'Pet Image',
            accessorKey: 'petImage',
            cell: ({ row }) => (
                <img src={row.original.petImage} alt={row.original.petName} className="w-16 h-16 object-cover" />
            ),
        },
        {
            header: 'Pet Name',
            accessorKey: 'petName',
        },
        {
            header: 'Donated Amount',
            accessorKey: 'donatedAmount',
        },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <button
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => askForRefund(row.original._id, row.original.donationCampaignId, row.original.donatedAmount)}
                    >
                        Ask for Refund
                    </button>
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
