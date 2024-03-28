import React, {useEffect} from "react";
import {useMachineStore} from "../hooks/useMachineStore.jsx";
import {Button, Group, Modal, Select, Stack, TextInput} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import UsersTable from "./usersTable.jsx";
import MachinesTable from "./machinesTable.jsx";
import {useDisclosure} from "@mantine/hooks";
import {useForm} from "@mantine/form";
import {useUserStore} from "../hooks/useUserStore.jsx";
import {notifications} from "@mantine/notifications";

export default function Machine() {
    const {filter, setFilter, addMachine, fetchMachines} = useMachineStore()
    const [isAddMachineModelOpened, {open: openAddMachineModel, close: closeAddMachineModel}] = useDisclosure()
    const form = useForm({
        initialValues: {
            user: "",
            key: ""
        }
    })
    
    const {users, fetchUsers} = useUserStore()

    useEffect(() => {
        fetchUsers();
    }, []);
    
    const userNames = users.map((user) => user.name)

    async function onAddMachineButtonSubmit(values) {
        await addMachine(values.user, values.key, async () => {
            notifications.show({
                title: "Machine added",
                message: "Machine added successfully",
                color: "green"
            })
            closeAddMachineModel()
            await fetchMachines()
        }, async (response) => {
            if (response.status === 500) {
                notifications.show({
                    title: "Machine not added",
                    message: (await response.json()).message,
                    color: "red"
                })
            } else {
                window.location.href = "/"
            }
        }, async (error) => {
            notifications.show({
                title: "Machine not added",
                message: error.message,
                color: "red"
            })
        })
    }

    return (
        <Stack>
            <Modal opened={isAddMachineModelOpened} onClose={closeAddMachineModel} title={"New Machine"}>
                <form onSubmit={form.onSubmit((values) => onAddMachineButtonSubmit(values))}>
                    <Stack>
                        <Select label={"User"} data={userNames} {...form.getInputProps("user")}></Select>
                        <TextInput label={"Key"} {...form.getInputProps("key")} mt={"md"}></TextInput>
                        <Button mt={"md"} type={"submit"}>Add</Button>
                    </Stack>
                </form>
            </Modal>
            <Group justify={"space-between"}>
                <Button onClick={openAddMachineModel}>New Machine</Button>
                <TextInput leftSection={<IconSearch/>} value={filter}
                           onChange={(e) => setFilter(e.target.value)}></TextInput>
            </Group>
            <MachinesTable></MachinesTable>
        </Stack>
    )
}