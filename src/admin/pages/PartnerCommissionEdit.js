import React from "react";
import Layout from "../layouts/Layout";
import { useParams } from "react-router-dom";



const PartnerComissionEdit = () => {
    const { id } = useParams();

    let handleSave = () => {
        console.log("Clicked");
     }

    function generateBreadcrumbData(data, RightContent = null) {

        const { partner } = data || {};
        return {
            leftItems: [
                { label: "Partners", link: '#'},
                { label: "Edit Commision", link: "#" },
            ],
            middleContent: partner && partner.name ? ` ${partner.name}` : "User Name",
            rightItems: [RightContent],
        };
    }

    const RightContent = (
        <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full">
            Save
        </button>
    );


    



    return (
        <Layout title="Edit Commission" breadcrumbData={generateBreadcrumbData({}, RightContent)}>
            <>Edit Commission id: {id}</>
            <br/>
            <strong>coming soon.</strong>
        </Layout>
    )
}

export default PartnerComissionEdit;