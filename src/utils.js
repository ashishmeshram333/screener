export const wallmineChartUri =
  "https://wallmine.com/widgets/chart/NASDAQ:AAPL";

export const company = {
  Symbol: "IBM",
  AssetType: "Common Stock",
  Name: "International Business Machines",
  Description:
    "International Business Machines Corporation (IBM) is an American multinational technology company headquartered in Armonk, New York.",
  CIK: "51143",
  Exchange: "NYSE",
  Currency: "USD",
  Country: "USA",
  Sector: "TECHNOLOGY",
  Industry: "COMPUTER & OFFICE EQUIPMENT",
  Address: "1 NEW ORCHARD ROAD, ARMONK, NY, US",
  FiscalYearEnd: "December",
  LatestQuarter: "2022-09-30",
  MarketCapitalization: "128326132000",
  EBITDA: "12010000000",
  PERatio: "23.51",
  PEGRatio: "1.223",
  BookValue: "22.2",
  DividendPerShare: "6.59",
  DividendYield: "0.0461",
  EPS: "6.09",
  RevenuePerShareTTM: "67.2",
  ProfitMargin: "0.0209",
  OperatingMarginTTM: "0.115",
  ReturnOnAssetsTTM: "0.0322",
  ReturnOnEquityTTM: "0.0648",
  RevenueTTM: "60535001000",
  GrossProfitTTM: "31486000000",
  DilutedEPSTTM: "6.09",
  QuarterlyEarningsGrowthYOY: "0.041",
  QuarterlyRevenueGrowthYOY: "0.065",
  AnalystTargetPrice: "139.96",
  TrailingPE: "23.51",
  ForwardPE: "14.9",
  PriceToSalesRatioTTM: "2.12",
  PriceToBookRatio: "6.45",
  EVToRevenue: "2.869",
  EVToEBITDA: "24.94",
  Beta: "0.877",
  SharesOutstanding: "896320000",
  DividendDate: "2022-12-10",
  ExDividendDate: "2022-11-09",
};

export const convertToCurrency = (labelValue) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(1) + " Bn"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(1) + " Mn"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(1) + " K"
    : Math.abs(Number(labelValue));
};

export const convertMillions = (labelValue) => {
  return (Math.abs(Number(labelValue)) / 1.0e6).toFixed(1)  
};

export const toSentenceCase = (camelCase) => {
  if (camelCase) {
    const result = camelCase.replace(/([A-Z])/g, " $1");
    return result[0].toUpperCase() + result.substring(1).toLowerCase();
  }
  return "";
};

export const sankeyColorPallet = [
  "#64b5f6",
  "#b2df8a",
  "#6aa84f",
  "#fdbf6f",
  "#557153",
  "#1f78b4",
  "#33a02c",
];
