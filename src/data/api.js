import Cookies from "js-cookie";
import baseUrl from "./apiConfig";

export const refreshToken = async () => {
    try {
        const refreshToken = Cookies.get('refreshToken');
        const response = await fetch(`${baseUrl}/api/auth/refreshtoken`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken: refreshToken }),
        });

        if (response.ok) {
            const data = await response.json();
            Cookies.set("accessToken", data.accessToken, { secure: true, sameSite: "strict" });
            return data.accessToken;
        } else {
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const fetchTransactionDataAPI = async (fromDate, toDate, option, optionValue, paymentMethodCategory, limit, navigate) => {
    try {
        const accessToken = Cookies.get('accessToken');
        // Check if fromDate is empty or undefined
        const fromDateParam = fromDate ? `&fromDate=${fromDate}` : '';

        // Check if toDate is empty or undefined
        const toDateParam = toDate ? `&toDate=${toDate}` : '';

        // Check if option is empty or undefined
        const optionParam = optionValue ? `&searchBy=${option}` : '';

        // Check if optionValue is empty or undefined
        const optionValueParam = optionValue ? `&searchValue=${optionValue}` : '';
        // Check if paymentMethodCategory is empty or undefined
        const paymentMethodCategoryParam = paymentMethodCategory ? `&paymentMethodCategory=${paymentMethodCategory}` : '';

        // Check if paymentMethodCategory is empty or undefined
        const limitParam = limit ? `&limit=${limit}` : '';

        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/txn?${fromDateParam}${toDateParam}${optionParam}${optionValueParam}${paymentMethodCategoryParam}${limitParam}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        );
        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await fetchTransactionDataAPI();
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return ;
        }

        const data = await response.json();
        if (response.ok) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchBillDataAPI = async (fromDate, toDate, option, optionValue, limit, navigate) => {
    try {
        const accessToken = Cookies.get('accessToken');
        // Check if fromDate is empty or undefined
        const fromDateParam = fromDate ? `&fromDate=${fromDate}` : '';

        // Check if toDate is empty or undefined
        const toDateParam = toDate ? `&toDate=${toDate}` : '';

        // Check if option is empty or undefined
        const optionParam = optionValue ? `&searchBy=${option}` : '';

        // Check if optionValue is empty or undefined
        const optionValueParam = optionValue ? `&searchValue=${optionValue}` : '';
        // Check if paymentMethodCategory is empty or undefined

        // Check if paymentMethodCategory is empty or undefined
        const limitParam = limit ? `&limit=${limit}` : '';

        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/bill?${fromDateParam}${toDateParam}${optionParam}${optionValueParam}${limitParam}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        );
        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await fetchTransactionDataAPI();
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return ;
        }

        const data = await response.json();
        if (response.ok) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchAffiliateDataAPI = async (fromDate, toDate, option, optionValue, limit, navigate) => {
    try {
        const accessToken = Cookies.get('accessToken');
        // Check if fromDate is empty or undefined
        const fromDateParam = fromDate ? `&fromDate=${fromDate}` : '';

        // Check if toDate is empty or undefined
        const toDateParam = toDate ? `&toDate=${toDate}` : '';

        // Check if option is empty or undefined
        const optionParam = optionValue ? `&searchBy=${option}` : '';

        // Check if optionValue is empty or undefined
        const optionValueParam = optionValue ? `&searchValue=${optionValue}` : '';
        // Check if paymentMethodCategory is empty or undefined

        // Check if paymentMethodCategory is empty or undefined
        const limitParam = limit ? `&limit=${limit}` : '';

        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/affiliate?${fromDateParam}${toDateParam}${optionParam}${optionValueParam}${limitParam}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        );
        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await fetchTransactionDataAPI();
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return ;
        }

        const data = await response.json();
        if (response.ok) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchSettlementDataAPI = async (fromDate, toDate, option, optionValue, paymentMethodCategory, limit, navigate) => {
    try {
        const accessToken = Cookies.get('accessToken');
        // Check if fromDate is empty or undefined
        const fromDateParam = fromDate ? `&fromDate=${fromDate}` : '';

        // Check if toDate is empty or undefined
        const toDateParam = toDate ? `&toDate=${toDate}` : '';

        // Check if option is empty or undefined
        const optionParam = optionValue ? `&searchBy=${option}` : '';

        // Check if optionValue is empty or undefined
        const optionValueParam = optionValue ? `&searchValue=${optionValue}` : '';

        // Check if paymentMethodCategory is empty or undefined
        const paymentMethodCategoryParam = paymentMethodCategory ? `&paymentMethodCategory=${paymentMethodCategory}` : '';

        // Check if paymentMethodCategory is empty or undefined
        const limitParam = limit ? `&limit=${limit}` : '';

        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/settlement?${fromDateParam}${toDateParam}${optionParam}${optionValueParam}${paymentMethodCategoryParam}${limitParam}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        );
        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await fetchSettlementDataAPI(fromDate, toDate, option, optionValue, paymentMethodCategory, limit, navigate);
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return ;
        }

        const data = await response.json();
        if (response.ok) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchInitiateSettlementDataAPI = async (fromDate, toDate, option, optionValue, paymentMethodCategory, limit, navigate, partnerClientId) => {
    try {
        const accessToken = Cookies.get('accessToken');
        // Check if fromDate is empty or undefined
        const fromDateParam = fromDate ? `&fromDate=${fromDate}` : '';

        // Check if toDate is empty or undefined
        const toDateParam = toDate ? `&toDate=${toDate}` : '';

        // Check if option is empty or undefined
        const optionParam = optionValue ? `&searchBy=${option}` : '';

        // Check if optionValue is empty or undefined
        const optionValueParam = optionValue ? `&searchValue=${optionValue}` : '';

        // Check if paymentMethodCategory is empty or undefined
        const paymentMethodCategoryParam = paymentMethodCategory ? `&paymentMethodCategory=${paymentMethodCategory}` : '';

        // Check if partnerClientId is empty or undefined
        const partnerClientIdParam = partnerClientId ? `&partnerClientId=${partnerClientId}` : '';

        // Check if paymentMethodCategory is empty or undefined
        const limitParam = limit ? `&limit=${limit}` : '';

        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/settlement/initiate?${fromDateParam}${toDateParam}${optionParam}${optionValueParam}${paymentMethodCategoryParam}${partnerClientIdParam}${limitParam}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        );

        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await fetchInitiateSettlementDataAPI(fromDate, toDate, option, optionValue, paymentMethodCategory, limit, navigate, partnerClientId);
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return ;
        }

        const data = await response.json();
        if (response.ok) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchApproveSettlementDataAPI = async (fromDate, toDate, option, optionValue,
                                                    paymentMethodCategory, limit, navigate, partnerClientId) => {
    try {
        const accessToken = Cookies.get('accessToken');
        // Check if fromDate is empty or undefined
        const fromDateParam = fromDate ? `&fromDate=${fromDate}` : '';

        // Check if toDate is empty or undefined
        const toDateParam = toDate ? `&toDate=${toDate}` : '';

        // Check if option is empty or undefined
        const optionParam = optionValue ? `&searchBy=${option}` : '';

        // Check if optionValue is empty or undefined
        const optionValueParam = optionValue ? `&searchValue=${optionValue}` : '';

        // Check if paymentMethodCategory is empty or undefined
        const paymentMethodCategoryParam = paymentMethodCategory ? `&paymentMethodCategory=${paymentMethodCategory}` : '';

        // Check if partnerClientId is empty or undefined
        const partnerClientIdParam = partnerClientId ? `&partnerClientId=${partnerClientId}` : '';

        // Check if paymentMethodCategory is empty or undefined
        const limitParam = limit ? `&limit=${limit}` : '';

        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/settlement/approve?${fromDateParam}${toDateParam}${optionParam}${optionValueParam}${paymentMethodCategoryParam}${partnerClientIdParam}${limitParam}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        );
        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await fetchApproveSettlementDataAPI(fromDate, toDate, option, optionValue, paymentMethodCategory, limit, navigate, partnerClientId);
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return;
        }

        const data = await response.json();
        if (response.ok) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const sendInitiateSettlementDataAPI = async (selectedIds, navigate, partnerClientId) => {
    try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/settlement/initiate`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    paymentIds: selectedIds,
                    partnerClientId: partnerClientId
                })
            }
        );
        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await sendInitiateSettlementDataAPI(selectedIds, navigate);
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return ;
        }

        const data = await response.json();
        if (response.ok) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const sendApproveSettlementDataAPI = async (selectedIds, navigate, partnerClientId) => {
    try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/settlement/approve`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    paymentIds: selectedIds,
                    partnerClientId: partnerClientId
                })
            }
        );
        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await sendApproveSettlementDataAPI(selectedIds, navigate);
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return;
        }

        const data = await response.json();
        if (response.ok) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const sendApproveProceedSettlementDataAPI = async (selectedIds, navigate, partnerClientId, finalAmount) => {
    try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/settlement/approve/prcd`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    paymentIds: selectedIds,
                    partnerClientId: partnerClientId,
                    finalAmount: finalAmount
                })
            }
        );
        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await sendApproveSettlementDataAPI(selectedIds, navigate);
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const sendCancelSettlementDataAPI = async (selectedIds, navigate, partnerClientId) => {
    try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/settlement/approve/cncl`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    paymentIds: selectedIds,

                    partnerClientId: partnerClientId
                })
            }
        );
        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await sendCancelSettlementDataAPI(selectedIds, navigate, partnerClientId);
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return;
        }

        const data = await response.json();
        if (response.ok) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchRevenueDataAPI = async (fromDate, toDate, option, optionValue, paymentMethodCategory, limit, navigate, token) => {
    try {
        const accessToken = token !== undefined && token !== null && token !== '' ? token : Cookies.get('accessToken');
        // Check if fromDate is empty or undefined
        const fromDateParam = fromDate ? `&fromDate=${fromDate}` : '';

        // Check if toDate is empty or undefined
        const toDateParam = toDate ? `&toDate=${toDate}` : '';

        // Check if option is empty or undefined
        const optionParam = optionValue ? `&searchBy=${option}` : '';

        // Check if optionValue is empty or undefined
        const optionValueParam = optionValue ? `&searchValue=${optionValue}` : '';

        // Check if paymentMethodCategory is empty or undefined
        const paymentMethodCategoryParam = paymentMethodCategory ? `&paymentMethodCategory=${paymentMethodCategory}` : '';

        // Check if paymentMethodCategory is empty or undefined
        const limitParam = limit ? `&limit=${limit}` : '';

        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/revenue-sharing?${fromDateParam}${toDateParam}${optionParam}${optionValueParam}${paymentMethodCategoryParam}${limitParam}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        );
        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await fetchRevenueDataAPI(fromDate, toDate, option, optionValue, paymentMethodCategory, limit, navigate);
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return ;
        }

        const data = await response.json();
        if (response.ok) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const uploadMisAPI = async (formData, partnerSelectedOption, navigate) => {
    try {
        const accessToken = Cookies.get('accessToken');
        const partnerSelectedOptionParam = partnerSelectedOption ? `&principalCredentialId=${partnerSelectedOption}` : '';

        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/mis-uploader?${partnerSelectedOptionParam}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: formData,
            }
        );
        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await uploadMisAPI(navigate);
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return ;
        }

        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

export const loginAPI = async (username, password) => {
    try {
        const encodedKey = btoa(`${username}:${password}`);
        const response = await fetch(
            `${baseUrl}/api/auth/token`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${encodedKey}`,
                },
            }
        );

        if (response.status === 401) {
            return ;
        }

        const data = await response.json();
        if (response.ok) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchKYCDataAPI = async (fromDate, toDate, option, optionValue, limit, navigate) => {
    try {
        const accessToken = Cookies.get('accessToken');
        // Check if fromDate is empty or undefined
        const fromDateParam = fromDate ? `&fromDate=${fromDate}` : '';

        // Check if toDate is empty or undefined
        const toDateParam = toDate ? `&toDate=${toDate}` : '';

        // Check if option is empty or undefined
        const optionParam = optionValue ? `&searchBy=${option}` : '';

        // Check if optionValue is empty or undefined
        const optionValueParam = optionValue ? `&searchValue=${optionValue}` : '';

        // Check if paymentMethodCategory is empty or undefined
        const limitParam = limit ? `&limit=${limit}` : '';

        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/kyc?${fromDateParam}${toDateParam}${optionParam}${optionValueParam}${limitParam}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        );
        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await fetchKYCDataAPI();
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return ;
        }

        const data = await response.json();
        if (response.ok) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchPromotionDataAPI = async (fromDate, toDate, option, optionValue, limit, navigate) => {
    try {
        const accessToken = Cookies.get('accessToken');
        // Check if fromDate is empty or undefined
        const fromDateParam = fromDate ? `&fromDate=${fromDate}` : '';

        // Check if toDate is empty or undefined
        const toDateParam = toDate ? `&toDate=${toDate}` : '';

        // Check if option is empty or undefined
        const optionParam = optionValue ? `&searchBy=${option}` : '';

        // Check if optionValue is empty or undefined
        const optionValueParam = optionValue ? `&searchValue=${optionValue}` : '';

        // Check if paymentMethodCategory is empty or undefined
        const limitParam = limit ? `&limit=${limit}` : '';

        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/promotion?${fromDateParam}${toDateParam}${optionParam}${optionValueParam}${limitParam}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        );
        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await fetchPromotionDataAPI(fromDate, toDate, option, optionValue, limit, navigate);
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return ;
        }

        const data = await response.json();
        if (response.ok) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchStoreDataAPI = async (fromDate, toDate, option, optionValue, limit, navigate) => {
    try {
        const accessToken = Cookies.get('accessToken');
        // Check if fromDate is empty or undefined
        const fromDateParam = fromDate ? `&fromDate=${fromDate}` : '';

        // Check if toDate is empty or undefined
        const toDateParam = toDate ? `&toDate=${toDate}` : '';

        // Check if option is empty or undefined
        const optionParam = optionValue ? `&searchBy=${option}` : '';

        // Check if optionValue is empty or undefined
        const optionValueParam = optionValue ? `&searchValue=${optionValue}` : '';

        // Check if paymentMethodCategory is empty or undefined
        const limitParam = limit ? `&limit=${limit}` : '';

        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/store?${fromDateParam}${toDateParam}${optionParam}${optionValueParam}${limitParam}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        );
        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await fetchStoreDataAPI(fromDate, toDate, option, optionValue, limit, navigate);
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return ;
        }

        const data = await response.json();
        if (response.ok) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchOrderDataAPI = async (fromDate, toDate, option, optionValue, limit, navigate) => {
    try {
        const accessToken = Cookies.get('accessToken');
        // Check if fromDate is empty or undefined
        const fromDateParam = fromDate ? `&fromDate=${fromDate}` : '';

        // Check if toDate is empty or undefined
        const toDateParam = toDate ? `&toDate=${toDate}` : '';

        // Check if option is empty or undefined
        const optionParam = optionValue ? `&searchBy=${option}` : '';

        // Check if optionValue is empty or undefined
        const optionValueParam = optionValue ? `&searchValue=${optionValue}` : '';

        // Check if paymentMethodCategory is empty or undefined
        const limitParam = limit ? `&limit=${limit}` : '';

        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/order?${fromDateParam}${toDateParam}${optionParam}${optionValueParam}${limitParam}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        );
        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await fetchOrderDataAPI(fromDate, toDate, option, optionValue, limit, navigate);
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return ;
        }

        const data = await response.json();
        if (response.ok) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchCumulativeCountAPI = async (fromDate, toDate, navigate) => {
    try {
        const accessToken = Cookies.get('accessToken');
        if (!fromDate) {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1; // Months are zero-based
            fromDate = (`${year}-${month.toString().padStart(2, '0')}-01`);
        }

        // Check if toDate is empty or undefined
        if (!toDate) {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1; // Months are zero-based
            const day = currentDate.getDate();
            toDate = (`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
        }
        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/txn-count?&fromDate=${fromDate}&toDate=${toDate}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        );
        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await fetchCumulativeCountAPI();
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return ;
        }

        const data = await response.json();
        if (response.ok) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchPartnerDetailsAPI = async (navigate) => {
    try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/partner-details`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        );
        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await fetchPartnerDetailsAPI();
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return ;
        }

        const data = await response.json();
        if (response.ok) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchAllPartnerDetailsAPI = async (navigate) => {
    try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/all-partner-details`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        );
        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await fetchAllPartnerDetailsAPI();
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return ;
        }

        const data = await response.json();
        if (response.ok) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchAllCredentialDetailsAPI = async (navigate) => {
    try {
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/all-cred-details`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        );
        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await fetchAllCredentialDetailsAPI();
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return ;
        }

        const data = await response.json();
        if (response.ok) {
            return data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const updatePartnerDetailsAPI = async (callbackURL, navigate) => {
    try {
        const accessToken = Cookies.get('accessToken');
        const requestData = {
            partnerCallbackUrl: callbackURL,
        };

        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/partner-details`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(requestData), // Convert the data to JSON format
                method: "PUT"
            }
        );
        console.log(response);
        if (response.status === 401) {
            const accessToken = await refreshToken();
            // Make a new request with the refreshed access token
            if (accessToken) {
                return await updatePartnerDetailsAPI();
            } else {
                deleteAllCookies();
                navigate('/login');
            }
            return ;
        }
        if (response.ok) {
            return true;
        }
    } catch (error) {
        console.log(error);
    }
};

export function deleteAllCookies() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
}
