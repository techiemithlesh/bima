import React from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";

const Dashboard = () => {

  function generateBreadcrumbData(rightContent = null) {
    return {
        leftItems: [
            { label: "", link: "/" },
            { label: "Dashboard", link: "/admin/dashboard" },
        ],
        middleContent: "",
        rightItems: rightContent
    };
}

const RightContent = (
  ''
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