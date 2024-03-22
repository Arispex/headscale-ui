import { AppShell, Burger, Group, NavLink} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDeviceDesktop, IconUser } from "@tabler/icons-react";
import { useState } from "react";

const data = [
    {icon: IconUser, label: "User View"},
    {icon: IconDeviceDesktop, label: "Device View"}
]

export default function Layout() {
    const [opened, { toggle }] = useDisclosure()
    const [active, setActive] = useState(0)
    const items = data.map((item, index) => (
        <NavLink
            label = {item.label}
            leftSection = {<item.icon size={"1rem"}/>}
            key={item.label}
            active={index === active}
            onClick={() => setActive(index)}
        />
    ))

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
                >
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size={"sm"}
                    >
                    </Burger>
                    <span>Headscale UI</span>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar
                p={"md"}
            >
                {items}
            </AppShell.Navbar>
            <AppShell.Main>
                Main
            </AppShell.Main>
        </AppShell>
    );
}