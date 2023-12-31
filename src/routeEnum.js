const RouteEnum = {
    transactionRoute: "transactions",
    settelementRoute: "settlement",
    promotionRoute: "promotion",
    storeRoute: "store",
    kycRoute: "kyc",
    revenueReport: "revenue",
    promoDataRoute: "promo-data",
    mistUploaderRoute: "mis-uploader"
};
const containsSubstring = (stringList, substring) =>
    stringList.some((str) => str.toLowerCase().includes(substring));

export { RouteEnum, containsSubstring };
