let baseUrl;

if (window.location.host.includes("localhost") || window.location.host.includes("dev")) {
    baseUrl = "https://dev.tara.app";
} else if (window.location.host.includes("uat")) {
    baseUrl = "https://alpha.tara.app";
} else {
    baseUrl = "https://prod.tara.app";
}

export default baseUrl;
