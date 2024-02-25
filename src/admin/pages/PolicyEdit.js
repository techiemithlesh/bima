import React, { useState } from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import { useParams } from "react-router-dom";


const PolicyEdit = () => {
    const {id} = useParams();

    return (
        <Layout>
            <Card>
                <h1>Policy Edit {id}</h1>
            </Card>
        </Layout>
    )
}

export default PolicyEdit;