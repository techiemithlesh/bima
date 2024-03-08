import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import axios from "axios";
import NoDataMessage from "../../shared/NoDataMessage";
import { faAdd, faAlignLeft, faCircleChevronLeft, faCircleChevronRight, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ViewDetailsModal from "./components/ViewDetailsModal";
import {TabsIcon} from "../../shared/Assets";

const GlobalCommissionList = () => {
    const [commissionData, setCommissionData] = useState([]);


    const [commissionsList, SetComissionList] = useState([]);
    const [isModalVisible, SetIsModalVisible] = useState(false);
    const [SelectedComission, SetSelectedCommission] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    function handleViewDetails(comission) {
        console.log(comission);
        SetSelectedCommission(comission);
        SetIsModalVisible(true);
    }

    function closeModal() {
        SetIsModalVisible(false);
        SetSelectedCommission(null);
    }

    useEffect(() => {
        const apiUrl = `https://premium.treatweb.com/public/api/admin/global-commissions/list?currentPage=${currentPage}`;
        // const apiUrl = `http://phpstorm.local:9000/api/admin/global-commissions/list?currentPage=${currentPage}`;

        axios.get(apiUrl)
            .then(response => {
                console.log(response);
                const responseData = response.data.global_commissions.data;
                setCommissionData(responseData);
                setTotalPages(response.data.global_commissions.last_page);
                console.log("totalpage", totalPages);
            })
            .catch(error => {
                console.error("Error fetching global commissions:", error);
            });
    }, [currentPage]);


    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    function generateBreadcrumbData(rightContent = null) {
        return {
            leftItems: [
                { label: "", link: "/" },
                { label: "Global Commission", link: "/global/commision/list" },
            ],
            middleContent: "",
            rightItems: rightContent
        };
    }


    const searchRightContent = (
        <>
            <input
                type="text"
                placeholder="Search"
                onChange={(e) => console.log("Search:", e.target.value)}
                className="border border-gray-300 px-8 py-2 searchbox focus:outline-none focus:border-blue-500"
            />
            <Link to={`/global/commision/add`}><img src={TabsIcon.addpartner} alt=""/></Link>

        </>
    );

    return (
        <Layout title="Global Commission List" breadcrumbData={generateBreadcrumbData(searchRightContent)}>
            <Card>
                {commissionData.length === 0 ? (
                    <NoDataMessage />
                ) : (<table className="min-w-full table-auto tablez">
                    <thead>
                        <tr>
                            <th className="px-1 py-2">S NO.</th>
                            <th className="px-1 py-2">COMPANY NAME</th>
                            <th className="px-1 py-2">COMMISSION TYPE</th>
                            <th className="px-1 py-2">VEHICLE TYPE</th>
                            <th className="px-1 py-2">COVERAGE TYPE</th>
                            <th className="px-1 py-2">VEHICLE SUBTYPE</th>
                            <th className="px-1 py-2">FUEL TYPE</th>
                            <th className="px-1 py-2">MAKE</th>
                            <th className="px-1 py-2">MODEL</th>
                            <th className="px-1 py-2">SEAT</th>
                            <th className="px-1 py-2">WEIGHT</th>
                            <th className="px-1 py-2">OD %</th>
                            <th className="px-1 py-2">TP %</th>
                            <th className="px-1 py-2">NET %</th>
                            <th className="px-1 py-2">FLAT AMOUNT</th>
                            <th className="px-1 py-2">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commissionData.map(commission => (
                            <tr key={commission.id} className={commission.id % 2 === 0 ? "bg-gray-50" : ""}>
                                <td className="px-1 py-4 border-b border-gray-300 text-center">{commission.id}</td>
                                <td className="px-1 py-4 border-b border-gray-300 text-center">{commission.insurer.name}</td>
                                <td className="px-1 py-4 border-b border-gray-300 text-center">{commission.commission_type.name}</td>
                                <td className="px-1 py-4 border-b border-gray-300 text-center">{commission.vehicle_type ? commission.vehicle_type.name : 'ALL'}</td>
                                <td className="px-1 py-4 border-b border-gray-300 text-center">{commission.coverage_type ? commission.coverage_type.name : 'ALL'}</td>
                                <td className="px-1 py-4 border-b border-gray-300 text-center">{commission.vehicle_subtype ? commission.vehicle_subtype.name : 'ALL'}</td>
                                <td className="px-1 py-4 border-b border-gray-300 text-center">{commission.fuel_type ? commission.fuel_type.name : 'ALL'}</td>
                                <td className="px-1 py-4 border-b border-gray-300 text-center">{commission.vehicle_make ? commission.vehicle_make.name : 'ALL'}</td>
                                <td className="px-1 py-4 border-b border-gray-300 text-center">{commission.vehicle_model ? commission.vehicle_model.name : 'ALL'}</td>
                                <td className="px-1 py-4 border-b border-gray-300 text-center">{commission.vehicle_seat_capacity ? commission.vehicle_seat_capacity.name : 'ALL'}</td>
                                <td className="px-1 py-4 border-b border-gray-300 text-center">{commission.vehicle_weight_type ? commission.vehicle_weight_type.name : 'NA'}</td>
                                <td className="px-1 py-4 border-b border-gray-300 text-center">{commission.od_percent ? commission.od_percent : 'N/A'}</td>
                                <td className="px-1 py-4 border-b border-gray-300 text-center">{commission.tp_percent ? commission.tp_percent : 'N/A'}</td>
                                <td className="px-1 py-4 border-b border-gray-300 text-center">{commission.net_percent ? commission.net_percent : 'N/A'}</td>
                                <td className="px-1 py-4 border-b border-gray-300 text-center">{commission.flat_amount ? commission.flat_amount : 'N/A'}</td>
                                <td className="px-1 py-4 border-b border-gray-300 text-center">
                                    <div className="flex justify-between items-center">
                                        <button onClick={() => handleViewDetails(commission)} className="text-white rounded mr-2">
                                            <img src={TabsIcon.eye} alt="View Details" />
                                        </button>

                                        <button className="text-white rounded mr-2">
                                            <Link to={`/global/commision/edit/${commission.id}`} className="px-1">
                                                <img src={TabsIcon.editpartner} alt="Edit Details" />
                                            </Link>
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>)}
                <div className="flex justify-between">
                    <div>
                        [{(currentPage - 1) * commissionData.length + 1} - 
                        {Math.min(currentPage * commissionData.length, totalPages * commissionData.length)} ({totalPages * commissionData.length})]
                    </div>
                    <div className="">
                        <button onClick={handlePrevPage} className="px-2 text-xl py-2"><FontAwesomeIcon icon={faCircleChevronLeft} /></button>
                        <button onClick={handleNextPage} className="px-2 text-xl py-2"><FontAwesomeIcon icon={faCircleChevronRight} /></button>
                    </div>
                </div>
            </Card>
            {isModalVisible && (
                <ViewDetailsModal onClose={closeModal} title="Global Commission Details" data={SelectedComission}>
                    <div className="grid gap-1 mb-2">
                        <table className="min-w-full table-auto border tablecommission">
                            <tbody>
                            {
                                (SelectedComission.capacities!=null) &&
                                Object.keys(SelectedComission.capacities).length>0 ? (
                                    Object.entries(SelectedComission.capacities).map((capacity, c_index) => (
                                        <tr>
                                            {c_index === 0 ?
                                                <th key={c_index}>{capacity[1]}</th>
                                                :
                                                <th key={c_index}>{capacity[1]}</th>
                                            }
                                            {
                                                Object.entries(SelectedComission.ages).map((age, index) => (
                                                    c_index === 0 ? (
                                                        <th key={index}>{age[1]}</th>
                                                    ):(
                                                        <td>{SelectedComission.agecapacity[capacity[0]][age[0]].value}</td>
                                                    )
                                                ))
                                            }
                                            {c_index === 0 ? (
                                                <th className="border-2 shade text-center">
                                                    DEAL
                                                </th>
                                            ) : (
                                                <td>{SelectedComission.agecapacity[capacity[0]].deal}</td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td style={{display:'none'}}>No Age Capacity found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </ViewDetailsModal>
            )}

        </Layout>
    );
};

export default GlobalCommissionList;
