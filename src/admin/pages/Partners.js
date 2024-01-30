import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faWallet, faUser, faCircleRight, faCircleArrowRight, faCircleChevronRight, faCircleChevronLeft, } from "@fortawesome/free-solid-svg-icons";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import { Link } from "react-router-dom";

const Partners = () => {
    const tableData = [
        { id: 1, imdCode: "001", Name: "John Doe", Number: "123456789", Type: "Type A", Status: "Active" },
        { id: 2, imdCode: "002", Name: "Jane Smith", Number: "987654321", Type: "Type B", Status: "Inactive" },
        { id: 3, imdCode: "003", Name: "Bob Johnson", Number: "555555555", Type: "Type C", Status: "Active" },
        { id: 4, imdCode: "004", Name: "Alice Brown", Number: "111122223", Type: "Type D", Status: "Inactive" },
        { id: 5, imdCode: "005", Name: "Chris Williams", Number: "999000111", Type: "Type E", Status: "Active" },
        { id: 6, imdCode: "006", Name: "Eva Davis", Number: "444333222", Type: "Type F", Status: "Inactive" },
        { id: 7, imdCode: "007", Name: "Michael Taylor", Number: "777888999", Type: "Type G", Status: "Active" },
        { id: 8, imdCode: "008", Name: "Sophia White", Number: "123098765", Type: "Type H", Status: "Inactive" },
        { id: 9, imdCode: "009", Name: "Daniel Martinez", Number: "876543210", Type: "Type I", Status: "Active" },
        { id: 10, imdCode: "010", Name: "Olivia Lee", Number: "321012345", Type: "Sales Person", Status: "Inactive" },
    ];

    const [PartnerList, SetPartnerList] = useState([]);


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


    const searchRightContent = (
        <input
            type="text"
            placeholder="Search with name"
            onChange={(e) => console.log("Search:", e.target.value)}
            className="border border-gray-300 px-8 py-2 rounded focus:outline-none focus:border-blue-500"
        />
    );


    /* PAGINATION START HERE */

    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = tableData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(tableData.length / pageSize);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const renderPaginationButtons = () => {
        const buttons = [];

        // Previous button
        buttons.push(
            <button
                key="prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-2 text-xl"
            >
                <FontAwesomeIcon icon={faCircleChevronLeft} />
            </button>
        );

        // Current page number
        buttons.push(
            <div key="current" className="px-2 py-2">
                {currentPage}
            </div>
        );

        // Next button
        buttons.push(
            <button
                key="next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-2 text-black text-xl"
            >
                <FontAwesomeIcon icon={faCircleChevronRight} />
            </button>
        );

        return buttons;
    };


    const renderLeftPaginationButtons = () => {
        const buttons = [];
    
        // Calculate the page range
        const pageRangeStart = Math.max(currentPage - 4, 1);
        const pageRangeEnd = Math.min(pageRangeStart + 7, totalPages);
    
        // Previous button
        buttons.push(
            <button
                key="prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-xl text-black"
            >
                
            </button>
        );
    
        // Display the page range
        buttons.push(
            <div key="pageRange" className="px-4 py-2 text-black">
                [{pageRangeStart}-{pageRangeEnd}({totalPages})]
            </div>
        );
    
        return buttons;
    };


    /* PAGINATION END HERE */

    return (
        <Layout title="Partner List" breadcrumbData={generateBreadcrumbData(searchRightContent)}>
            <Card>
                <table className="min-w-full table-auto border border-gray-300">
                    <thead>
                        <tr className="bg-gray-300 ">
                            <th className="px-4 py-2">Imd Code.</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Number</th>
                            <th className="px-4 py-2">Type</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((row, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{row.imdCode}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{row.Name}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{row.Number}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{row.Type}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{row.Status}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">
                                    <button
                                        onClick={() => console.log("View clicked")}
                                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    <Link
                                        to={`/partner/addcommision/${row.id}`}
                                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        <FontAwesomeIcon icon={faWallet} />
                                    </Link>
                                    <Link
                                        to={`/partner/details/add/${row.id}`}    
                                        className="bg-indigo-500 text-white px-2 py-1 rounded"
                                    >
                                        <FontAwesomeIcon icon={faUser} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* PAGINATION */}
                <div className="flex justify-between mt-4">
                <div className="flex justify-around items-center">
                    {renderLeftPaginationButtons("left")}
                </div>
                <div className="flex justify-around items-center">
                    {renderPaginationButtons("right")}
                </div>
            </div>

            </Card>
        </Layout>
    );
};





export default Partners;
