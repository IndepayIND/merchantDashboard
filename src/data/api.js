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
                return await fetchSettlementDataAPI();
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
