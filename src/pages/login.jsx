import {Center, Flex, Group, Stack, Title} from "@mantine/core";
import LoginForm from "../components/loginForm.jsx";
import React from "react";

export default function Login() {
    return (
        <Center className="h-screen">
            <Stack className={"w-1/3"}>
                <Group justify={"center"}>
                    <Title>Headscale UI</Title>
                </Group>
                <LoginForm></LoginForm>
            </Stack>
        </Center>
    )
}