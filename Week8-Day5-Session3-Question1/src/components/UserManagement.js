import React, { useEffect, useState } from 'react'
import useQuery from '../useQuery';

function UserManagement() {
    const initialData = [
        { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
        { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor" },
        { id: 3, name: "Charlie Davis", email: "charlie@example.com", role: "Viewer" }
    ]

    const [userList, setUserList] = useState(initialData);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: ''
    })
    const query = useQuery();
    console.log(query);

    const [searchKey, setSearchKey] = useState(query.get('search') || '');
    const [filterKey, setFilterKey] = useState(query.get('role') || '');

    useEffect(() => {
        const params = new URLSearchParams();
        console.log(params);
        if (searchKey) {
            params.set('search', searchKey)
        }
        if (filterKey) {
            params.set('role', filterKey)
        }
        // if (searchKey || filterKey)
            window.history.replaceState(null, '', `?${params.toString()}`);

        // console.log(params);
    }, [searchKey, filterKey])

    const filteredUsers = userList.filter((user) => {
        const matchUserEmail =
            (
                user.name.toLowerCase().includes(searchKey.toLowerCase()) ||
                user.email.toLowerCase().includes(searchKey.toLowerCase())
            )
            const matchRole = filterKey ? user.role === filterKey : true
            return matchUserEmail && matchRole
    })

    console.log(filteredUsers);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || formData.role === '') {
            alert("Please fill in all fields");
            return;
        }
        const newData = {
            id: userList.length > 0 ? userList[userList.length - 1].id + 1 : 1,
            name: formData.name,
            email: formData.email,
            role: formData.role
        }

        setUserList([
            ...userList, newData
        ])

        setFormData({
            name: '',
            email: '',
            role: ''
        })

    }

    const handleDelete = (id) => {
        const filterData = userList.filter(user => user.id !== id);
        setUserList(filterData);
    }

    const handleSearchByKey = (e) => {
        setSearchKey(e.target.value);
    }

    const handleSearchByFilter = (e) => {
        setFilterKey(e.target.value);
    }

    const getFilteredUsers = () => {
        let filtered = userList;

        if (searchKey) {
            if (searchKey.includes('@')) {
                filtered = filtered.filter(user =>
                    user.email.toLowerCase().includes(searchKey.toLowerCase())
                );
            } else {
                filtered = filtered.filter(user =>
                    user.name.toLowerCase().includes(searchKey.toLowerCase())
                );
            }
        }

        if (filterKey) {
            filtered = filtered.filter(user =>
                user.role.toLowerCase().includes(filterKey.toLowerCase())
            );
        }

        return filtered;
    }

    return (
        <div>
            <h1>User Management System</h1>

            <div className='filterData'>
                <input
                    type='text'
                    placeholder='Search by name or email'
                    name='searchKey'
                    id='searchKey'
                    value={searchKey}
                    onChange={handleSearchByKey}
                />

                <select value={filterKey} onChange={handleSearchByFilter} name='filterKey' aria-label='Filter by Role'>
                    <option value="All">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                </select>
            </div>
            {getFilteredUsers().length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getFilteredUsers().map(data => (
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.role}</td>
                                    <td><button onClick={() => handleDelete(data.id)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            ) : (
                <div>No User records found</div>
            )}


            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Name'
                    name='name'
                    id='name'
                    aria-label='User Name'
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    id='email'
                    aria-label='User Email'
                    value={formData.email}
                    onChange={handleChange}
                />

                <select value={formData.role} onChange={handleChange} aria-label='User Role' name='role'>
                    <option value="All">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                </select>

                <button type='submit'>
                    Add User
                </button>
            </form>
        </div>
    )
}

export default UserManagement