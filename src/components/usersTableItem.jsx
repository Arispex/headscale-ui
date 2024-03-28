import {Button, Group, Popover, Stack, Table, Text, TextInput, Tooltip} from "@mantine/core";
import React from "react";
import {IconPencilMinus, IconX} from "@tabler/icons-react";
import {useUserStore} from "../hooks/useUserStore.jsx";
import {notifications} from "@mantine/notifications";
import {useForm} from "@mantine/form";

export default function UsersTableItem(props) {
    const [isDeletePopoverOpened, setIsDeletePopoverOpened] = React.useState(false)
    const [isRenamePopoverOpened, setIsRenamePopoverOpened] = React.useState(false)
    const {deleteUser, fetchUsers, renameUser} = useUserStore()
    const renamePopoverForm = useForm({
        initialValues: {
            newName: ""
        }
    })

    async function onDeleteButtonClick(name) {
        await deleteUser(name, async () => {
                notifications.show({
                    title: "User deleted",
                    message: "User deleted successfully",
                    color: "green"
                })
                await fetchUsers()
            }, async (response) => {
                if (response.status === 500) {
                    notifications.show({
                        title: "User not deleted",
                        message: (await response.json()).message,
                        color: "red"
                    })
                } else {
                    window.location.href = "/"
                }
            }, (error) => {
                notifications.show({
                        title: "User not deleted",
                        message: error.message,
                        color: "red"
                    }
                )
            }
        )
        setIsDeletePopoverOpened(!isDeletePopoverOpened)
    }

    async function onRenameUserPopoverFormSubmit(name, values) {
        await renameUser(name, values.newName, async () => {
            notifications.show({
                title: "User renamed",
                message: "User renamed successfully",
                color: "green"
            })
            await fetchUsers()
        }, async (response) => {
            if (response.status === 500) {
                notifications.show({
                    title: "User not renamed",
                    message: (await response.json()).message,
                    color: "red"
                })
            } else {
                window.location.href = "/"
            }
        }, (error) => {
            notifications.show({
                title: "User not renamed",
                message: error.message,
                color: "red"
            })
        })
        setIsRenamePopoverOpened(!isRenamePopoverOpened)
    }

    return (
        <Table.Tr key={props.id}>
            <Table.Td>{props.id}</Table.Td>
            <Table.Td>{props.name}</Table.Td>
            <Table.Td>{props.createdAt}</Table.Td>
            <Table.Td>
                <Group gap={"md"}>
                    <Popover withArrow opened={isDeletePopoverOpened} onChange={setIsDeletePopoverOpened}>
                        <Popover.Target>
                            <Tooltip label={"Delete"} onClick={() => setIsDeletePopoverOpened(!isDeletePopoverOpened)}>
                                <IconX></IconX>
                            </Tooltip>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Stack gap={"md"}>
                                <Group justify={"center"}>
                                    <Text>Are you sure?</Text>
                                </Group>
                                <Group>
                                    <Button onClick={() => onDeleteButtonClick(props.name)}>Yes</Button>
                                    <Button onClick={() => setIsDeletePopoverOpened(!isDeletePopoverOpened)}>No</Button>
                                </Group>
                            </Stack>
                        </Popover.Dropdown>
                    </Popover>
                    <Popover withArrow opened={isRenamePopoverOpened} onChange={setIsRenamePopoverOpened}>
                        <Popover.Target>
                            <Tooltip label={"Rename"} onClick={() => setIsRenamePopoverOpened(!isRenamePopoverOpened)}>
                                <IconPencilMinus></IconPencilMinus>
                            </Tooltip>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <form
                                onSubmit={renamePopoverForm.onSubmit((values) => onRenameUserPopoverFormSubmit(props.name, values))}>
                                <Stack>
                                    <TextInput label={"New Name"} {...renamePopoverForm.getInputProps("newName")}></TextInput>
                                    <Group>
                                        <Button type={"submit"}>Rename</Button>
                                        <Button
                                            onClick={() => setIsRenamePopoverOpened(!isRenamePopoverOpened)}>Cancel</Button>
                                    </Group>
                                </Stack>
                            </form>
                        </Popover.Dropdown>
                    </Popover>
                </Group>
            </Table.Td>
        </Table.Tr>
    )
}