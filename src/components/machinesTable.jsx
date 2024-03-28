import React, {useEffect} from "react";
import {Table} from "@mantine/core";
import {useMachineStore} from "../hooks/useMachineStore.jsx";
import MachinesTableItem from "./machinesTableItem.jsx";

export default function MachinesTable() {
    const {filteredMachines, fetchMachines} = useMachineStore();

    useEffect( () => {
        fetchMachines();
    }, []);

    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Id</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Created At</Table.Th>
                    <Table.Th>Operation</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {filteredMachines().map((machine) => (
                    <MachinesTableItem id={machine.id} name={machine.name} createdAt={machine.createdAt}
                                       key={machine.id}></MachinesTableItem>
                ))}
            </Table.Tbody>
        </Table>
    )
}