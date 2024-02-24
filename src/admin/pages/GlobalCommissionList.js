import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import axios from "axios";
import NoDataMessage from "../../shared/NoDataMessage";

const GlobalCommissionList = () => {
    const [commissionData, setCommissionData] = useState([]);

    useEffect(() => {
        const apiUrl = `https://premium.treatweb.com/public/api/admin/global-commissions/list`;

        axios.get(apiUrl)
            .then(response => {
               console.log(response);
               const responseData = response.data.global_commissions.data;
                setCommissionData(responseData); 
            })
            .catch(error => {
                console.error("Error fetching global commissions:", error);
            });
    }, []);

    return (
        <Layout>
            <Card>
                {commissionData.length === 0 ? (
                    <NoDataMessage/>
                ) : (<table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th>COMPANY NAME</th>
                        <th>COMMISSION TYPE</th>
                        <th>VEHICLE TYPE</th>
                        <th>COVERAGE TYPE</th>
                        <th>VEHICLE SUBTYPE</th>
                        <th>FUEL TYPE</th>
                        <th>VEHICLE AGE</th>
                        <th>ENGINE</th>
                        <th>MAKE</th>
                        <th>MODEL</th>
                        <th>SEAT</th>
                        <th>WEIGHT</th>
                        <th>OD %</th>
                        <th>TP %</th>
                        <th>NET %</th>
                        <th>FLAT AMOUNT</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {commissionData.map(commission => (
                        <tr key={commission.id}>
                            <td>{commission.company_name}</td>
                            <td>{commission.commission_type}</td>
                            <td>{commission.vehicle_type}</td>
                            <td>{commission.coverage_type}</td>
                            <td>{commission.vehicle_subtype}</td>
                            <td>{commission.fuel_type}</td>
                            <td>{commission.vehicle_age}</td>
                            <td>{commission.engine}</td>
                            <td>{commission.make}</td>
                            <td>{commission.model}</td>
                            <td>{commission.seat}</td>
                            <td>{commission.weight}</td>
                            <td>{commission.od_percent}</td>
                            <td>{commission.tp_percent}</td>
                            <td>{commission.net_percent}</td>
                            <td>{commission.flat_amount}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>)}
                
            </Card>
        </Layout>
    );
};

export default GlobalCommissionList;
