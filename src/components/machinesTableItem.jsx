import React from "react";
import {useForm} from "@mantine/form";
import {notifications} from "@mantine/notifications";
import {Button, Group, Popover, Stack, Table, Text, TextInput, Tooltip} from "@mantine/core";
import {IconPencilMinus, IconX} from "@tabler/icons-react";
import {useMachineStore} from "../hooks/useMachineStore.jsx";

export default function MachinesTableItem(props) {
    const [isDeletePopoverOpened, setIsDeletePopoverOpened] = React.useState(false)
    const [isRenamePopoverOpened, setIsRenamePopoverOpened] = React.useState(false)
    const {deleteMachine, fetchMachines, renameMachine} = useMachineStore()
    const renamePopoverForm = useForm({
        initialValues: {
            newName: ""
        }
    })

    async function onDeleteButtonClick(machineId) {
        await deleteMachine(machineId, async () => {
                notifications.show({
                    title: "Machine deleted",
                    message: "Machine deleted successfully",
                    color: "green"
                })
                await fetchMachines()
            }, async (response) => {
                if (response.status === 500) {
                    notifications.show({
                        title: "Machine not deleted",
                        message: (await response.json()).message,
                        color: "red"
                    })
                } else {
                    window.location.href = "/"
                }
            }, (error) => {
                notifications.show({
                        title: "Machine not deleted",
                        message: error.message,
                        color: "red"
                    }
                )
            }
        )
        setIsDeletePopoverOpened(!isDeletePopoverOpened)
    }

    async function onRenamePopoverFormSubmit(machineId, values) {
        await renameMachine(machineId, values.newName, async () => {
            notifications.show({
                title: "Machine renamed",
                message: "Machine renamed successfully",
                color: "green"
            })
            await fetchMachines()
        }, async (response) => {
            if (response.status === 500) {
                notifications.show({
                    title: "Machine not renamed",
                    message: (await response.json()).message,
                    color: "red"
                })
            } else {
                window.location.href = "/"
            }
        }, (error) => {
            notifications.show({
                title: "Machine not renamed",
                message: error.message,
                color: "red"
            })
        })
        setIsRenamePopoverOpened(!isRenamePopoverOpened)
    }

    return (
        <Table.Tr key={props.id}>
            <Table.Td>{props.id}</Table.Td>
            <Table.Td>{props.givenName + "(" + props.name + ")"}</Table.Td>
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
                                    <Button onClick={() => onDeleteButtonClick(props.id)}>Yes</Button>
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
                                onSubmit={renamePopoverForm.onSubmit((values) => onRenamePopoverFormSubmit(props.id, values))}>
                                <Stack>
                                    <TextInput
                                        label={"New Name"} {...renamePopoverForm.getInputProps("newName")}></TextInput>
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