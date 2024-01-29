import React from "react";
import Layout from "../layouts/Layout";


const AddComission = () => {
    function generateBreadcrumbData() {
    
        return {
          leftItems: [
            { label: "Partners", link: "/admin/partners" },
            { label: "Commision", link: "/admin/dashboard" },
          ],
          middleContent: "User Name",
          rightItems: { label: "Save", action: () => console.log("Save clicked") },
        };
      }

    return (
    <Layout title="Add Partner Comission" breadcrumbData={generateBreadcrumbData}>
        <h2>Add Commision</h2>
    </Layout>

    )
}

export default AddComission;