import {useUserStore} from "../hooks/useUserStore.jsx";
import React, {useEffect} from "react";
import {Table} from "@mantine/core";
import UsersTableItem from "./usersTableItem.jsx";

export default function UsersTable() {
    const {filteredUsers, fetchUsers} = useUserStore();

    useEffect(() => {
        fetchUsers(() => {
        }, () => {
            window.location.href = "/"
        });
    }, []);
    
    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Id</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Created At</Table.Th>
                    <Table.Th>Action</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {filteredUsers().map((user) => (
                    <UsersTableItem id={user.id} name={user.name} createdAt={user.createdAt}
                                    key={user.id}></UsersTableItem>
                ))}
            </Table.Tbody>
        </Table>
    )
}