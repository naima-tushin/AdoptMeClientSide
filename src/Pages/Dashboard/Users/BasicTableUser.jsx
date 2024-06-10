import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
import React, { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function BasicTableUser() {
    const [users, setUser] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user`);
                if (!response.ok) {
                    throw new Error('Failed to fetch donations');
                }
                const data = await response.json();
                console.log(data);
                setUser(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUser();
    }, []);

    const makeAdmin = async (id, userName) => {
        try {
           

            const form = { role: 'admin' };

            const response = await axios.put(`http://localhost:5000/makeAdmin/${id}`, form);
            if (response.status === 200) {
                Swal.fire('Success', `${userName} made admin successfully`, 'success');
                window.location.reload();
            } else {
                Swal.fire('Error', 'Failed to make admin', 'error');
            }

        } catch (error) {
            Swal.fire('Error', 'Failed to make admin', 'error');
            console.error('Error making admin:', error);
        }
    };

    const data = useMemo(() => users, [users]);

    const columns = [
        {
            header: 'Serial Number',
            cell: info => info.row.index + 1,
        },
        {
            header: 'Profile Image',
            accessorKey: 'image',
            cell: ({ row }) => (
                <img src={row.original.image} alt={row.original.name} className="w-16 h-16 object-cover" />
            ),
        },
        {
            header: 'Name',
            accessorKey: 'name',
        },
        {
            header: 'Email',
            accessorKey: 'email',
        },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <>
                        {row.original.role == "admin" ? null : (<button
                            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => makeAdmin(row.original._id, row.original.name)}
                        >
                            Make Admin
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
