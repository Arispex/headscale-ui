import {Box, Button, Group, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {notifications} from "@mantine/notifications";
import {useHeadscaleApiKeyStore} from "../hooks/useHeadscaleApiKeyStore.jsx";
import {useHeadscaleUrlStore} from "../hooks/useHeadscaleUrlStore.jsx";

export default function LoginForm() {
	const {headscaleUrl, setHeadscaleUrl} = useHeadscaleUrlStore()
    const {headscaleApiKey, setHeadscaleApiKey} = useHeadscaleApiKeyStore()

    const form = useForm({
        initialValues: {
            headscaleUrl: headscaleUrl,
            headscaleApiKey: headscaleApiKey,
        },
    });

    function verifyApiKey(url, apikey) {
        fetch(url + "/api/v1/apikey", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + apikey,
                Accept: "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    setHeadscaleApiKey(apikey)
                    setHeadscaleUrl(url)

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
                    verifyApiKey(values.headscaleUrl, values.headscaleApiKey)
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
