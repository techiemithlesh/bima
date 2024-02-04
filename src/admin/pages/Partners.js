import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faWallet, faUser, faCircleRight, faCircleArrowRight, faCircleChevronRight, faCircleChevronLeft, } from "@fortawesome/free-solid-svg-icons";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { data } from "autoprefixer";
import Loading from "react-loading";

const Partners = () => {


    const [PartnerList, SetPartnerList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = 'https://premium.treatweb.com/public/api/admin/partner/list';

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.data);
                SetPartnerList(data.data);
                setLoading(false);

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);



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
    const currentData = PartnerList.slice(startIndex, endIndex);
    const totalPages = Math.ceil(PartnerList.length / pageSize);

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
                {loading ? <div className="loading-overlay">
                    <div className="loading">
                        <Loading type="ball-triangle" color="#4fa94d" height={100} width={100} />
                    </div>
                </div> : <table className="min-w-full table-auto border border-gray-300">
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
                        {PartnerList.map((partner) => (
                            <tr key={partner.id} className={partner.id % 2 === 0 ? "bg-gray-50" : ""}>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{partner.partner_code}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{partner.name}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{partner.mobile}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{partner.partner_type}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{partner.partner_status.toUpperCase()}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">
                                    <button
                                        onClick={() => console.log("View clicked")}
                                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    <Link
                                        to={`/partner/addcommision/${partner.id}`}
                                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                    >

                                        <FontAwesomeIcon icon={faWallet} />
                                    </Link>
                                    <Link
                                        to={`/partner/details/add/${partner.id}`}
                                        className="bg-indigo-500 text-white px-2 py-1 rounded"
                                    >
                                        <FontAwesomeIcon icon={faUser} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}


                {/* PAGINATION */}

                {loading ? <div className="loading-overlay">
                    <div className="loading">
                        <Loading type="ball-triangle" color="#4fa94d" height={100} width={100} />
                    </div>
                </div> :<div className="flex justify-between mt-4">
                    <div className="flex justify-around items-center">
                        {renderLeftPaginationButtons("left")}
                    </div>
                    <div className="flex justify-around items-center">
                        {renderPaginationButtons("right")}
                    </div>
                </div> }
                

            </Card>
        </Layout>
    );
};





export default Partners;
