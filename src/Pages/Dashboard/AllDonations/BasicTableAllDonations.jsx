import { Link } from 'react-router-dom';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
import React, { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';


export default function BasicTableAllDonations() {

    const [donationCampaigns, setDonationCampaign] = useState([]);

    useEffect(() => {
        const fetchDonationCampaign = async () => {
            try {
                const response = await fetch(`http://localhost:5000/DonationCampaignsDetails`);
                if (!response.ok) {
                    throw new Error('Failed to fetch pets');
                }
                const data = await response.json();
                console.log(data);
                setDonationCampaign(data);
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        };

        fetchDonationCampaign();
    }, []);

    

    const data = useMemo(() => donationCampaigns, [donationCampaigns]);

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
            header: 'Maximum donation amount',
            accessorKey: 'maxDonationAmount',
        },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <Link className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        to={`/Dashboard/EditDonationCampaign/${row.original._id}`}>
                        Edit
                    </Link>
                    <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() =>
                            deleteCampaign(row.original._id, row.original.petName)
                        }
                    >
                        Delete
                    </button>
                    {row.original.isPause == false ? (
                        <button
                            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => pauseDonationCampaign(row.original._id)}
                        >
                            Pause Donation
                        </button>
                    ) : null}
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

    const pauseDonationCampaign = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/updateDonationCampaignStatus/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isPause: true }),
            });

            if (!response.ok) {
                throw new Error('Failed to pause donation campaign');
            }
            Swal.fire({
                title: `Status Changed`,
                text: "Paused donation campaign Successfully",
                icon: "success",
            });
            window.location.reload();

            setDonationCampaign(donationCampaigns.map(donationCampaign => donationCampaign.id === id ? { ...donationCampaign, adopted: true } : donationCampaign));
        } catch (error) {
            console.error('Error marking as adopted:', error);
        }
    };

    // Function to delete a pet
    const deleteCampaign = async (id, campaignName) => {
        try {
           

            const response = await fetch(`http://localhost:5000/donationCampaignDelete/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete pet');
            }
            Swal.fire({
                title: `${campaignName} is Deleted`,
                text: "Donation Campaign Deleted Successfully",
                icon: "success",
            });
            setDonationCampaign(donationCampaigns.filter(donationCampaign => donationCampaign._id !== id));
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

            
        </div>
    );
}
