import React, { useState } from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import { useParams } from "react-router-dom";


const GlobalCommissionEdit = () => {
    const {id} = useParams();
    const [commissionData, setCommissionData] = useState(null);
    const [loading, setLoading] = useState(true);

    return (
        <Layout>
            <Card>
                <h1>Edit Global Comission</h1>
            </Card>
        </Layout>
    )
}


export default GlobalCommissionEdit;