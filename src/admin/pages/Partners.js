import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faWallet, faUser, faCircleRight, faCircleArrowRight, faCircleChevronRight, faCircleChevronLeft, faMoneyBill, faMoneyCheck, } from "@fortawesome/free-solid-svg-icons";
import Layout from "../layouts/Layout";
import Card from "../Components/Card";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { data } from "autoprefixer";
import Loading from "react-loading";
import { Icons, Images, TabsIcon } from "../../shared/Assets";
import ViewDetailsModal from "./components/ViewDetailsModal";


const Partners = () => {
    const [PartnerList, SetPartnerList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    function handleViewDetails(partner) {
        setSelectedPartner(partner);
        setIsModalVisible(true);
    }

    function closeModal() {
        setIsModalVisible(false);
        setSelectedPartner(null);
    }

    useEffect(() => {
        // const apiUrl = 'http://127.0.0.1:9000/api/admin/partner/list';
        const apiUrl = 'https://premium.treatweb.com/public/api/admin/partner/list?currentPage=${currentPage}';

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("response", data.data);
                const responseData = data.data.data;
                SetPartnerList(responseData);
                setTotalPages(data.data.last_page);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [currentPage]);



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
        <>
            <input
                type="text"
                placeholder="Search with name"
                onChange={(e) => console.log("Search:", e.target.value)}
                className="border border-gray-300 px-8 py-2 searchbox focus:outline-none focus:border-blue-500"
            />
            <Link to={`/partner/details/add`}><img src={TabsIcon.addpartner} alt="" /></Link>
        </>
    );


    let handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    let handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage - 1);
        }
    }
    return (
        <Layout title="Partner List" breadcrumbData={generateBreadcrumbData(searchRightContent)}>
            <Card>
                {loading ? <div className="loading-overlay">
                    <div className="loading">
                        <Loading type="ball-triangle" color="#4fa94d" height={100} width={100} />
                    </div>
                </div> : <table className="min-w-full table-auto border tablez">
                    <thead>
                        <tr className="shade">
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
                                <td className="px-4  border-b border-gray-300 text-center">{partner.partner_code}</td>
                                <td className="px-4 border-b border-gray-300 text-center">{partner.name}</td>
                                <td className="px-4 border-b border-gray-300 text-center">{partner.mobile}</td>
                                <td className="px-4 border-b border-gray-300 text-center">{partner.partner_type}</td>
                                <td className="px-4  border-b border-gray-300 text-center">{partner.partner_status.toUpperCase()}</td>
                                <td className="px-4 flex justify-center">
                                    <button onClick={() => handleViewDetails(partner)} className="text-white rounded mr-2">
                                        <img src={TabsIcon.eye} alt="" />
                                    </button>
                                    <button className=" text-white rounded mr-2" >
                                        <Link
                                            to={`/partner/comissions/list/${partner.id}`}
                                            className=" text-white rounded mr-2">

                                            <img src={TabsIcon.partnercommision} alt="" />
                                        </Link>
                                    </button>

                                    <button
                                        className=" text-white rounded mr-2" >
                                        <Link
                                            to={`/partner/details/edit/${partner.id}`}
                                            className=" text-white rounded mr-2" >

                                            <img src={TabsIcon.editpartner} alt="" />
                                        </Link>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}


                {/* PAGINATION */}

                <div className="flex justify-between">
                    <div>
                        [{(currentPage - 1) * PartnerList.length + 1} -
                        {Math.min(currentPage * PartnerList.length, totalPages * PartnerList.length)} ({totalPages})]
                    </div>
                    <div className="">
                        <button onClick={handlePrevPage} className="px-2 text-xl py-2"><FontAwesomeIcon icon={faCircleChevronLeft} /></button>
                        <button onClick={handleNextPage} className="px-2 text-xl py-2"><FontAwesomeIcon icon={faCircleChevronRight} /></button>
                    </div>
                </div>
            </Card>

            {/* MODAL START HERE*/}
            {isModalVisible && (
                <ViewDetailsModal onClose={closeModal} title="Partner Details" data={selectedPartner}>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <p className="font-semibold">Partner Code:</p>
                            <p>{selectedPartner.partner_code}</p>
                            <p className="font-semibold mt-3">Email:</p>
                            <p>{selectedPartner.email}</p>
                            <p className="font-semibold mt-3">Partner Code:</p>
                            <p>{selectedPartner.partner_code}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Name:</p>
                            <p>{selectedPartner.name}</p>
                            <p className="font-semibold mt-3">Mobile:</p>
                            <p>{selectedPartner.mobile}</p>
                            <p className="font-semibold mt-3">Partner Branch:</p>
                            <p>{selectedPartner.partner_branch}</p>
                        </div>
                        <div>
                            {selectedPartner.partner_info.profile_image ? (
                                <img src={'https://premium.treatweb.com/public' + selectedPartner.partner_info.profile_image} className="w-auto" alt="Partner Profile" />
                            ) : (
                                <img src={Images.UserProfile} alt="Default Profile" className="w-30 h-44" />
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <p className="font-semibold">Partner Status:</p>
                            <p>{selectedPartner.partner_status}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Partner Type:</p>
                            <p>{selectedPartner.partner_type}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Address</p>
                            <p>{selectedPartner.partner_info.address}</p>
                        </div>
                        <div>
                            <p className="font-semibold">City</p>
                            <p>{selectedPartner.partner_info.city}</p>
                        </div>
                        <div>
                            <p className="font-semibold">State</p>
                            <p>{selectedPartner.partner_info.state}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Country</p>
                            <p>{selectedPartner.partner_info.country}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Pin Code</p>
                            <p>{selectedPartner.partner_info.pin_code}</p>
                        </div>

                    </div>
                </ViewDetailsModal>
            )}
            {/* MODAL END HERE */}
        </Layout>
    );
};





export default Partners;
