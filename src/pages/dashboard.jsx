import {IconDeviceDesktop, IconUser} from "@tabler/icons-react";
import React from "react";
import Layout from "../layouts/layout.jsx";
import User from "../components/user.jsx";
import Machine from "../components/machine.jsx";

const data = [
    {
        label: "User",
        icon: <IconUser></IconUser>,
        view: <User></User>
    },
    {
        label: "Machine",
        icon: <IconDeviceDesktop></IconDeviceDesktop>,
        view: <Machine></Machine>
    },
]
export default function Dashboard() {
    return(
        <Layout data={data}></Layout>
    )
}