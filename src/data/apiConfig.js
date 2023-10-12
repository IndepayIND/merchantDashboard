let baseUrl;

if (window.location.host.includes("localhost")) {
    baseUrl = "https://prod.tara.app";
} else if (window.location.host.includes("dev")) {
    baseUrl = "https://dev.tara.app";
} else if (window.location.host.includes("uat")) {
    baseUrl = "https://alpha.tara.app";
} else {
    baseUrl = "https://prod.tara.app";
}

export default baseUrl;
