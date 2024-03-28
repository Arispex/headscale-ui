import {ActionIcon, AppShell, Box, Burger, Group, NavLink, Title, Tooltip} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {IconBrandGithub, IconDoorExit} from "@tabler/icons-react";
import React, {useState} from "react";
import {useHeadscaleUrlStore} from "../hooks/useHeadscaleUrlStore.jsx";
import {useHeadscaleApiKeyStore} from "../hooks/useHeadscaleApiKeyStore.jsx";

export default function Layout(props) {
    const {setHeadscaleUrl} = useHeadscaleUrlStore()
    const {setHeadscaleApiKey} = useHeadscaleApiKeyStore()

    const [opened, {toggle}] = useDisclosure()
    const [active, setActive] = useState(0)

    const items = props.data.map((item, index) => (
        <NavLink
            label={item.label}
            leftSection={item.icon}
            key={item.label}
            active={index === active}
            onClick={() => setActive(index)}
        />
    ))

    function exit() {
        setHeadscaleUrl("")
        setHeadscaleApiKey("")

        window.location.href = "/"
    }

    return (
        <AppShell
            header={{
                height: 60
            }}
            navbar={{
                width: 200,
                breakpoint: "sm",
                collapsed: {
                    mobile: !opened
                },
            }}
            padding={'sm'}
        >
            <AppShell.Header>
                <Group
                    px={"md"}
                    h={"100%"}
                    justify={"space-between"}
                >
                    <Group>
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom="sm"
                            size={"sm"}
                        >
                        </Burger>
                        <Title>Headscale UI</Title>
                    </Group>
                    <Box>
                        <Tooltip label={"Github"}
                                 onClick={() => window.location.href = "https://github.com/Arispex/headscale-ui"}>
                            <ActionIcon variant={"default"} size={"lg"}>
                                <IconBrandGithub size={"1.5rem"} stroke={1.3}></IconBrandGithub>
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label={"Exit"} onClick={() => exit()}>
                            <ActionIcon variant={"default"} size={"lg"} ml={"md"}>
                                <IconDoorExit size={"1.5rem"} stroke={1.3}></IconDoorExit>
                            </ActionIcon>
                        </Tooltip>
                    </Box>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar
                p={"md"}
            >
                {items}
            </AppShell.Navbar>
            <AppShell.Main>
                {props.data[active].view}
            </AppShell.Main>
        </AppShell>
    );
}