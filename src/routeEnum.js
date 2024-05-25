const RouteEnum = {
    transactionRoute: "transactions",
    settelementRoute: "settlement",
    makerRoute: "maker",
    checkerRoute: "checker",
    promotionRoute: "promotion",
    storeRoute: "store",
    kycRoute: "kyc",
    revenueReport: "revenue",
    promoDataRoute: "promo-data",
    refundRoute: "refund",
    bill: "bill",
    mistUploaderRoute: "mis-uploader"
};
const containsSubstring = (stringList, substring) =>
    stringList.some((str) => str.toLowerCase().includes(substring));

export { RouteEnum, containsSubstring };
