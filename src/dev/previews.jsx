import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import React from 'react'
import Layout from "../layouts/layout.jsx";
import Machine from "../components/machine.jsx";
import LoginForm from "../components/loginForm.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Layout">
                <Layout/>
            </ComponentPreview>
            <ComponentPreview path="/Machine">
                <Machine/>
            </ComponentPreview>
            <ComponentPreview path="/LoginForm">
                <LoginForm/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews