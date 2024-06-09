import React, { useState, useEffect } from 'react';
import { useReactTable } from '@tanstack/react-table';

const PetsPage = () => {
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage] = useState(10);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:5000/myFood/userEmail');
        if (!response.ok) {
          throw new Error('Failed to fetch pets');
        }
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);

  // Use the useTable hook to create table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useReactTable({
    columns: [
      // Define your table columns here
      { Header: 'Serial Number', accessor: 'serialNumber' },
      { Header: 'Pet Name', accessor: 'name' },
      { Header: 'Pet Category', accessor: 'category' },
      { Header: 'Pet Image', accessor: 'image', Cell: ({ cell: { value } }) => <img src={value} alt="Pet" style={{ width: '50px' }} /> },
      { Header: 'Adoption Status', accessor: 'adopted', Cell: ({ cell: { value } }) => value ? 'Adopted' : 'Not Adopted' },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <>
            <button onClick={() => handleUpdate(row.original.id)}>Update</button>
            <button onClick={() => handleDelete(row.original.id)}>Delete</button>
            <button onClick={() => handleAdopt(row.original.id)}>Adopted</button>
          </>
        )
      }
    ],
    data: pets,
  });

  const handleUpdate = (petId) => {
    // Handle update logic
  };

  const handleDelete = (petId) => {
    // Handle delete logic
  };

  const handleAdopt = (petId) => {
    // Handle adopt logic
  };

  // Pagination
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {currentPets.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(pets.length / petsPerPage) }, (_, i) => (
          <li key={i} className={currentPage === i + 1 ? 'active' : ''}>
            <button onClick={() => paginate(i + 1)}>{i + 1}</button>
          </li>
        ))}
      </ul>

      {/* Delete Modal */}
      {deleteModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setDeleteModal(false)}>&times;</span>
            <p>Are you sure you want to delete this pet?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setDeleteModal(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetsPage;
