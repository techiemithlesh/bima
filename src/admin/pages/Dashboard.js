import React from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";

const Dashboard = () => {

  function generateBreadcrumbData(rightContent = null) {
    return {
        leftItems: [
            { label: "", link: "/" },
            { label: "Partners", link: "/admin/partners" },
        ],
        middleContent: "",
        rightItems: rightContent
    };
}

const RightContent = (
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
    Save
  </button>
);


  return (
    <Layout title="Admin Dashboard" breadcrumbData={generateBreadcrumbData(RightContent)}>
      <div className="card_container mx-4 my-4 h-100">
        <Card>
          <h1>Admin Dashboard</h1>
        </Card>
      </div>
    </Layout>
  )
}

export default Dashboard;