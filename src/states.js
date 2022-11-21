import { atom } from "recoil";

let defaultCompany = {"Symbol":"MSFT","AssetType":"Common Stock","Name":"Microsoft Corporation","Description":"Microsoft Corporation is an American multinational technology company which produces computer software, consumer electronics, personal computers, and related services. Its best known software products are the Microsoft Windows line of operating systems, the Microsoft Office suite, and the Internet Explorer and Edge web browsers. Its flagship hardware products are the Xbox video game consoles and the Microsoft Surface lineup of touchscreen personal computers. Microsoft ranked No. 21 in the 2020 Fortune 500 rankings of the largest United States corporations by total revenue; it was the world's largest software maker by revenue as of 2016. It is considered one of the Big Five companies in the U.S. information technology industry, along with Google, Apple, Amazon, and Facebook.","CIK":"789019","Exchange":"NASDAQ","Currency":"USD","Country":"USA","Sector":"TECHNOLOGY","Industry":"SERVICES-PREPACKAGED SOFTWARE","Address":"ONE MICROSOFT WAY, REDMOND, WA, US","FiscalYearEnd":"June","LatestQuarter":"2022-09-30","MarketCapitalization":"1798167331000","EBITDA":"98841002000","PERatio":"25.97","PEGRatio":"2.135","BookValue":"23.28","DividendPerShare":"2.54","DividendYield":"0.0113","EPS":"9.29","RevenuePerShareTTM":"27.14","ProfitMargin":"0.344","OperatingMarginTTM":"0.417","ReturnOnAssetsTTM":"0.152","ReturnOnEquityTTM":"0.429","RevenueTTM":"203074994000","GrossProfitTTM":"135620000000","DilutedEPSTTM":"9.29","QuarterlyEarningsGrowthYOY":"-0.133","QuarterlyRevenueGrowthYOY":"0.106","AnalystTargetPrice":"299.37","TrailingPE":"25.97","ForwardPE":"25.38","PriceToSalesRatioTTM":"8.85","PriceToBookRatio":"10.38","EVToRevenue":"8.64","EVToEBITDA":"17.4","Beta":"0.92","52WeekHigh":"341.1","52WeekLow":"212.83","50DayMovingAverage":"237.85","200DayMovingAverage":"267.61","SharesOutstanding":"7454470000","DividendDate":"2022-12-08","ExDividendDate":"2022-11-16"};

export const ticker = atom({
  key: "ticker",
  default: "MSFT",
});

export const company = atom({
  key: "company",
  default: defaultCompany,
});
