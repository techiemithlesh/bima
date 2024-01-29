import React from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";

const Dashboard = () => {

  function generateBreadcrumbData() {
    
    return {
      leftItems: [
        { label: "Home", link: "/admin/dashboard" },
        { label: "Dashboard", link: "/admin/dashboard" },
      ],
      middleContent: "Current Page",
      rightItems: { label: "Save", action: () => console.log("Save clicked") },
    };
  }

    return (
        <Layout title="Admin Dashboard" breadcrumbData={generateBreadcrumbData}>
        <div className="card_container mx-4 my-4 h-100">
          <Card>
            <h1>Admin Dashboard</h1>
          </Card>
          </div>
        </Layout>
    )
}

export default Dashboard;