import {Button, Group, Modal, Stack, TextInput} from "@mantine/core";
import React from "react";
import {IconSearch} from "@tabler/icons-react";
import UsersTable from "./usersTable.jsx";
import {useUserStore} from "../hooks/useUserStore.jsx";
import {useDisclosure} from "@mantine/hooks";
import {useForm} from "@mantine/form";
import {notifications} from "@mantine/notifications";

export default function User() {
    const {filter, setFilter, addUser, fetchUsers} = useUserStore();
    const [isAddUserModelOpened, {open: openAddUserModel, close: closeAddUserModel}] = useDisclosure()
    const form = useForm({
        initialValues: {
            name: ""
        }
    })

    async function onAddUserButtonSubmit(values) {
        await addUser(values.name, async () => {
            notifications.show({
                title: "User added",
                message: "User added successfully",
                color: "green"
            })
            closeAddUserModel()
            await fetchUsers()
        }, async (response) => {
            if (response.status === 500) {
                notifications.show({
                    title: "User not added",
                    message: (await response.json()).message,
                    color: "red"
                })
            }
            else {
                window.location.href = "/"
            }
        }, async (error) => {
            notifications.show({
                title: "User not added",
                message: error.message,
                color: "red"
            })
        })
    }

    return (
        <Stack>
            <Modal opened={isAddUserModelOpened} onClose={closeAddUserModel} title={"New User"}>
                <form onSubmit={form.onSubmit((values) => onAddUserButtonSubmit(values))}>
                    <Stack>
                        <TextInput label={"Name"} {...form.getInputProps("name")}></TextInput>
                        <Button mt={"md"} type={"submit"}>Add</Button>
                    </Stack>
                </form>
            </Modal>
            <Group justify={"space-between"}>
                <Button onClick={openAddUserModel}>New User</Button>
                <TextInput leftSection={<IconSearch/>} value={filter}
                           onChange={(e) => setFilter(e.target.value)}></TextInput>
            </Group>
            <UsersTable></UsersTable>
        </Stack>
    )
}