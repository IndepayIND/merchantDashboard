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

export const fetchTransactionData = async (fromDate, toDate, navigate) => {
    try {
        const accessToken = Cookies.get('accessToken');
        // Check if fromDate is empty or undefined
        if (!fromDate) {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1; // Months are zero-based
            fromDate = `${year}-${month.toString().padStart(2, '0')}-01`;
        }

        // Check if toDate is empty or undefined
        if (!toDate) {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1; // Months are zero-based
            const day = currentDate.getDate();
            toDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        }

        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/txn?fromDate=${fromDate}&toDate=${toDate}`,
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
                return await fetchTransactionData();
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

export const fetchTransactionDataByOption = async (option, optionValue, navigate) => {
    try {
        const accessToken = Cookies.get('accessToken');
        // Check if fromDate is empty or undefined

        const response = await fetch(
            `${baseUrl}/v0.1/tara/pgrouter/dashboard/txn?searchBy=${option}&searchValue=${optionValue}`,
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
                return await fetchTransactionDataByOption();
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

function deleteAllCookies() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
}
