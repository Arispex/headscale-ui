import {Box, Button, Group, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {notifications} from "@mantine/notifications";
import {useHeadscaleApiKeyStore} from "../hooks/useHeadscaleApiKeyStore.jsx";
import {useHeadscaleUrlStore} from "../hooks/useHeadscaleUrlStore.jsx";
import {verifyApiKey} from "../services/api.js";

export default function LoginForm() {
    const {headscaleUrl, setHeadscaleUrl} = useHeadscaleUrlStore()
    const {headscaleApiKey, setHeadscaleApiKey} = useHeadscaleApiKeyStore()

    const form = useForm({
        initialValues: {
            headscaleUrl: headscaleUrl,
            headscaleApiKey: headscaleApiKey,
        },
    });
    

    function onSubmit(values) {
        verifyApiKey(values.headscaleUrl, values.headscaleApiKey)
            .then((response) => {
                if (response.ok) {
                    setHeadscaleApiKey(values.headscaleApiKey)
                    setHeadscaleUrl(values.headscaleUrl)

                    notifications.show({
                        color: "green",
                        title: "Verification successful",
                    });

                    setTimeout(() => {
                        window.location.href = "/dashboard"
                    }, 1000);
                } else {
                    notifications.show({
                        color: "red",
                        title: "Verification failed",
                        message: "Invalid API key",
                    });
                }
            })
            .catch(() =>
                notifications.show({
                    color: "red",
                    title: "Verification failed",
                    message: "Unable to connect to server",
                })
            );
    }

    return (
        <Box className={"w-1/3"}>
            <form
                onSubmit={form.onSubmit((values) =>
                    onSubmit(values)
                )}
            >
                <TextInput
                    label="Headscale URL"
                    mt={"md"}
                    {...form.getInputProps("headscaleUrl")}
                />
                <TextInput
                    label="Headscale API Key"
                    mt={"md"}
                    {...form.getInputProps("headscaleApiKey")}
                />
                <Group mt={"xl"} justify={"center"}>
                    <Button type="submit" fullWidth>
                        Login
                    </Button>
                </Group>
            </form>
        </Box>
    );
}
