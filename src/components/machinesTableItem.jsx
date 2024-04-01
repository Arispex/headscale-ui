import React from "react";
import {useForm} from "@mantine/form";
import {notifications} from "@mantine/notifications";
import {Badge, Button, Group, Modal, Popover, Stack, Table, Text, TextInput, Tooltip} from "@mantine/core";
import {IconInfoCircle, IconPencilMinus, IconX} from "@tabler/icons-react";
import {useMachineStore} from "../hooks/useMachineStore.jsx";
import {useDisclosure} from "@mantine/hooks";

export default function MachinesTableItem(props) {
    const [isDeletePopoverOpened, setIsDeletePopoverOpened] = React.useState(false)
    const [isRenamePopoverOpened, setIsRenamePopoverOpened] = React.useState(false)
    const {deleteMachine, fetchMachines, renameMachine} = useMachineStore()
    const renamePopoverForm = useForm({
        initialValues: {
            newName: ""
        }
    })
    const [isMoreInfoModalOpened, {open: openMoreInfoModal, close: closeMoreInfoModal}] = useDisclosure()

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
        <Table.Tr key={props.data.id}>
            <Table.Td>{props.data.id}</Table.Td>
            <Table.Td>{props.data.givenName + "(" + props.data.name + ")"}</Table.Td>
            <Table.Td>{props.data.createdAt}</Table.Td>
            <Table.Td>
                <Group>
                    {props.data.forcedTags.map((tag) => (<Badge>{tag.slice(4)}</Badge>))}
                </Group>
            </Table.Td>
            <Table.Td>{props.data.online ? <Badge color={"green"}>Online</Badge> : <Badge color={"red"}>Offline</Badge>}</Table.Td>
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
                                    <Button onClick={() => onDeleteButtonClick(props.data.id)}>Yes</Button>
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
                                onSubmit={renamePopoverForm.onSubmit((values) => onRenamePopoverFormSubmit(props.data.id, values))}>
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
                    <Tooltip label={"More Information"}>
                        <IconInfoCircle onClick={openMoreInfoModal}></IconInfoCircle>
                    </Tooltip>
                    <Modal opened={isMoreInfoModalOpened} onClose={closeMoreInfoModal} title={"More Information"} size={"xl"}>
                        <Stack gap={"lg"}>
                            <Group justify={"space-between"}>
                                <span className={"font-bold"}>Machine Key</span>
                                <span>{props.data.machineKey}</span>
                            </Group>
                            <Group justify={"space-between"}>
                                <span className={"font-bold"}>Node Key</span>
                                <span>{props.data.nodeKey}</span>
                            </Group>
                            <Group justify={"space-between"}>
                                <span className={"font-bold"}>Disco Key</span>
                                <span>{props.data.discoKey}</span>
                            </Group>
                            <Group justify={"space-between"}>
                                <span className={"font-bold"}>IP Addresses</span>
                                <Stack gap={"xs"}>
                                    {props.data.ipAddresses.map((ipAddress) => (
                                        <span key={ipAddress}>{ipAddress}</span>
                                    ))}
                                </Stack>
                            </Group>
                            <Group justify={"space-between"}>
                                <span className={"font-bold"}>Name</span>
                                <span>{props.data.name}</span>
                            </Group>
                            <Group justify={"space-between"}>
                                <span className={"font-bold"}>User</span>
                                <span>{props.data.user.name}</span>
                            </Group>
                            <Group justify={"space-between"}>
                                <span className={"font-bold"}>Last Seen</span>
                                <span>{props.data.lastSeen}</span>
                            </Group>
                            <Group justify={"space-between"}>
                                <span className={"font-bold"}>Last Successful Update</span>
                                <span>{props.data.lastSuccessfulUpdate}</span>
                            </Group>
                            <Group justify={"space-between"}>
                                <span className={"font-bold"}>Expiry</span>
                                <span>{props.data.expiry}</span>
                            </Group>
                            <Group justify={"space-between"}>
                                <span className={"font-bold"}>Pre Auth Key</span>
                                <span>{props.data.preAuthKey}</span>
                            </Group>
                            <Group justify={"space-between"}>
                                <span className={"font-bold"}>Created At</span>
                                <span>{props.data.createdAt}</span>
                            </Group>
                            <Group justify={"space-between"}>
                                <span className={"font-bold"}>Register Method</span>
                                <span>{props.data.registerMethod}</span>
                            </Group>
                        </Stack>
                    </Modal>
                </Group>
            </Table.Td>
        </Table.Tr>
    )
}