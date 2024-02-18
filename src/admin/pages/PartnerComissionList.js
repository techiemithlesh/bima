import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { data } from "autoprefixer";
import { TabsIcon } from "../../shared/Assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import ViewDetailsModal from "./components/ViewDetailsModal";


const PartnerComissionList = () => {
    const { id } = useParams();

    const [commissionsList, SetComissionList] = useState([]);
    const [isModalVisible, SetIsModalVisible] = useState(false);
    const [selectedComission, SetSelectedCommission] = useState(null);

    const handleViewDetails = (commissionId) => {
        // Find the commission object in commissionsList based on commissionId
        const commission = commissionsList.find((c) => c.id === commissionId);
        SetSelectedCommission(commission);
        SetIsModalVisible(true); 
      };

    function closeModal() {
        SetIsModalVisible(false);
        SetSelectedCommission(null);
    }


    function generateBreadcrumbData(rightContent = null) {
        return {
            leftItems: [
                { label: "Partners", link: "/admin/partners" },
                { label: "Commission", link: "#" },
            ],
            middleContent: "Test / 2345",
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `https://premium.treatweb.com/public/api/admin/partner/commissionoptions/${id}`;
                const res = await axios.get(apiUrl);
                console.log(res.data.commissions)
                const comissionData = res.data.commissions;
                SetComissionList(comissionData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <Layout title="Partner Comission List " breadcrumbData={generateBreadcrumbData()}>
            <Card>
               
                <table className="min-w-full table-auto border border-gray-300">
                
                    <thead>
                        <tr className="bg-gray-300 ">
                            <th className="px-2 py-2">Commission Type</th>
                            <th className="px-2 py-2">Insurance Company</th>
                            <th className="px-2 py-2">Vehicle Type</th>
                            <th className="px-2 py-2">Vehicle SubType</th>
                            <th className="px-2 py-2">Fuel Type</th>
                            <th className="px-2 py-2">Vehicle Age</th>
                            <th className="px-2 py-2">Engine</th>
                            <th className="px-2 py-2">Make</th>
                            <th className="px-2 py-2">Seat</th>
                            <th className="px-2 py-2">OD Commission %</th>
                            <th className="px-2 py-2">TP Commission %</th>
                            <th className="px-2 py-2">NET Commission %</th>
                            <th className="px-2 py-2">Flat Commission Amount</th>
                            <th className="px-2 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commissionsList.map((commission) => (
                            <tr key={commission.id}>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.business_types_name}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.insurers_name}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.vehcle_type ?? 'NA'}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.vehicle_subtype_id}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.fuel_type_id}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.vehicle_age_id ?? 'NA'}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.vehicle_engine_capacity_id ?? 'NA'}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.vehicle_make_id ?? 'NA'}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.vehicle_seat_capacity_id ?? 'NA'}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.od_percent}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.tp_percent}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.net_percent}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.flat_amount}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">
                                    <div className="flex justify-between items-center">
                                        <button
                                            onClick={() => handleViewDetails(commission.id)}
                                            className="rounded mr-2"
                                        >
                                        <FontAwesomeIcon icon={faEye}/>
                                        </button>
                                        <Link to={`/partner/addcommision/${commission.partner_id}`} className="px-1">
                                            <FontAwesomeIcon icon={faAdd} />
                                        </Link>

                                        <Link to='/partner/comission/edit' className="px-1">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Link>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            {isModalVisible && (
                <ViewDetailsModal onClose={closeModal} data={selectedComission} title="Commission Details">
                  <h1>ID : {selectedComission.id}</h1>
                </ViewDetailsModal>
            )}
        </Layout>
    )
}


export default PartnerComissionList;