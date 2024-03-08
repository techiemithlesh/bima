import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { data } from "autoprefixer";
import { Icons, TabsIcon } from "../../shared/Assets";
import ViewDetailsModal from "./components/ViewDetailsModal";
import {count} from "react-table/src/aggregations";


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
            middleContent: (count(commissionsList)>0 ? commissionsList[0].name:"") + " / "+ (count(commissionsList)>0 ? commissionsList[0].partner_code:""),
            rightItems: rightContent
        };
    }

    const searchRightContent = (

            <Link to={`/partner/addcommision/${id}`} className="px-1">
                <img src={Icons.Addcommision} alt="View Details" style={{width:"40px"}} />
            </Link>
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `https://premium.treatweb.com/public/api/admin/partner/commission/${id}`;
                // const apiUrl = `http://127.0.0.1:9000/api/admin/partner/commission/${id}`;
                const res = await axios.get(apiUrl);
                const comissionData = res.data;
                SetComissionList(comissionData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <Layout title="Partner Commission List " breadcrumbData={generateBreadcrumbData(searchRightContent)}>
            <Card>
               
                <table className="min-w-full table-auto border border-gray-300 tablez">
                
                    <thead>
                        <tr className="bg-gray-300 ">
                            <th className="px-2 py-2">Commission Type</th>
                            <th className="px-2 py-2">Insurance Company</th>
                            <th className="px-2 py-2">Vehicle Type</th>
                            <th className="px-2 py-2">Vehicle SubType</th>
                            <th className="px-2 py-2">Fuel Type</th>
                            <th className="px-2 py-2">Seat</th>
                            <th className="px-2 py-2">OD Commission %</th>
                            <th className="px-2 py-2">TP Commission %</th>
                            <th className="px-2 py-2">NET Commission %</th>
                            <th className="px-2 py-2">Flat Commission Amount</th>
                            <th className="px-2 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commissionsList && commissionsList.map((commission) => (
                            <tr key={commission.id}>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.business_types_name}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.insurers_name}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.vehicle_types_name ?? 'NA'}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.vehicle_subtypename}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.fuel_type_name}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.vehicle_engine_capacity_name ?? 'NA'}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.od_percent}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.tp_percent}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.net_percent}</td>
                                <td className="px-4 py-4 border-b border-gray-300 text-center">{commission.flat_amount}</td>
                                <td className="px-4 py-2 flex justify-center" style={{width:'150px'}}>
                                        <button onClick={() => handleViewDetails(commission.id)}
                                            className="text-white rounded mr-2">
                                            <img src={TabsIcon.eye} alt="View Details" />
                                        </button>
                                       {/*<button className=" text-white rounded mr-2" >*/}
                                       {/* <Link to={`/partner/editcommision/${commission.id}`} className="px-1">*/}
                                       {/*     <img src={TabsIcon.editpartner} alt="View Details" />*/}
                                       {/* </Link>*/}
                                       {/*</button>*/}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            {isModalVisible && (
                <ViewDetailsModal onClose={closeModal} data={selectedComission} title="Commission Details">
                    <div className="mt-1">
                        <div className="grid grid-cols-3 gap-1 mb-2">
                            <div className="col-span-1">
                                <p className="font-semibold label">Commission Type:</p>
                                <span className="labelvalue">
                                     {selectedComission.business_types_name}
                                </span>
                            </div>
                            <div className="col-span-1">
                                <p className="font-semibold label">Vehicle Type:</p>
                                <span className="labelvalue">
                                     {selectedComission.insurers_name}
                                </span>
                            </div>
                            <div className="col-span-1">
                                <p className="font-semibold label">OD Commission:</p>
                                <span className="labelvalue">
                                     {selectedComission.od_percent+'%'}
                                </span>
                            </div>
                            <div className="col-span-1">
                                <p className="font-semibold label">TP Commission:</p>
                                <span className="labelvalue">
                                     {selectedComission.tp_percent+'%'}
                                </span>
                            </div>
                            <div className="col-span-1">
                                <p className="font-semibold label">Net Commission:</p>
                                <span className="labelvalue">
                                     {selectedComission.net_percent+'%'}
                                </span>
                            </div>
                            <div className="col-span-1">
                                <p className="font-semibold label">Last Updated:</p>
                                <span className="labelvalue">
                                     NA
                                </span>
                            </div>
                        </div>

                            <div className="grid gap-1 mb-2">
                                <table className="min-w-full table-auto border tablecommission">
                                    <tbody>
                                    {/*{JSON.parse(selectedComission.engines)}*/}

                                    {
                                        (JSON.parse(selectedComission.engines)!=null) &&
                                        Object.keys(JSON.parse(selectedComission.engines)).length>0 ? (
                                            Object.entries(JSON.parse(selectedComission.engines)).map((engines, c_index) => (
                                                <tr>
                                                    {c_index === 0 ?
                                                        <th key={c_index}>{engines[1]}</th>
                                                        :
                                                        <th key={c_index}>{engines[1]}</th>
                                                    }
                                                    {
                                                        Object.entries(JSON.parse(selectedComission.ages)).map((age, index) => (
                                                            c_index === 0 ? (
                                                                <th key={index}>{age[1]}</th>
                                                            ):(

                                                                <td>
                                                                    {JSON.parse(selectedComission.agecapacity)[engines[0]][age[0]].value}
                                                                </td>
                                                            )
                                                        ))
                                                    }
                                                    {c_index === 0 ? (
                                                        <th className="border-2 shade text-center">
                                                            DEAL
                                                        </th>
                                                    ) : (
                                                        <td>{selectedComission.agecapacity[engines[0]].deal}</td>
                                                    )}
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td style={{display:'none'}}>No Age/Capacity found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                    </div>
                </ViewDetailsModal>
            )}
        </Layout>
    )
}


export default PartnerComissionList;