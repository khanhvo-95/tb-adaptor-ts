import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import { format, toDate, isValid, parseISO } from "date-fns";
import TrialBalanceDAO from "../dao/trial-balance.dao";
import TBData from "../model/tb-data.model";
import { ITBDataProps } from "../model/tb-data.model";

interface IDataFromDB {
  segment10?: string;
  segment8?: string;
  segment9?: string;
  [key: string]: string | number | boolean | Date | undefined | any;
}

function generateAdaptorSpecificProperties(tbData: ITBDataProps): void {
    tbData.journalEntryCreationDate = format(new Date(), "yyyy/MM/dd");
    tbData.interfaceGroupIdentifier = format(new Date(), "ddMMyyyyHHmm");
    let channelCode = "CHANNEL_CODE_FOR_MFI";
    const attribute1 =
      tbData.segment4 +
      channelCode +
      tbData.segment4 +
      tbData.segment3 +
      tbData.segment2;
    tbData.attribute1 = attribute1;
    tbData.reconciliationReference = attribute1;
}

function populateAccountingDate(tbData: ITBDataProps): void {
    const date = toDate(parseISO(tbData.effectiveDateOfTransaction));
    if (isValid(date)) {
      tbData.accountingDate = format(date, "yyyy/MM/dd");
    } else {
      // Handle the invalid date case, e.g., set a default value or throw an error
      tbData.accountingDate = null;
    }
}

async function retrieveTrialBalanceData(startId: number): Promise<any[]> {
  const trialBalanceDao = new TrialBalanceDAO();
  const responseData = await trialBalanceDao.getTrialBalanceDetails(startId);
  if (!responseData.length) {
    return [];
  }
  return responseData;
}

// Here I assume the tbDataList is of IDataFromDB type, adjust according to actual structure
function getTbDataListPerAccountingDate(tbDataList: IDataFromDB[]): {[date: string]: IDataFromDB[]} {
  return tbDataList.reduce((accumulator, currentValue: IDataFromDB) => {
    let key = currentValue.accountingDate;
    if (!accumulator[key]) {
      accumulator[key] = [];
    }
    accumulator[key].push(currentValue);
    return accumulator;
  }, {} as {[date: string]: IDataFromDB[]});
}

function mergeData(tbDataFromODS: any[], staticData: Map<string, string>) {
  console.log("mergeData is ::: START");
  const tbDataList = [];
  const staticDataObj = Object.fromEntries(staticData.entries());
  
  for (let i = 0; i < tbDataFromODS.length; i++) {
    let dataFromDB = tbDataFromODS[i] as IDataFromDB;
    dataFromDB = {
      ...dataFromDB,
      ...staticDataObj,
    };

    populateAccountingDate(dataFromDB);
    generateAdaptorSpecificProperties(dataFromDB);
    tbDataList.push(dataFromDB);
  }
  
  return getTbDataListPerAccountingDate(tbDataList);
}

app.http("data_merger", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "data-processors",
  handler: async (request: HttpRequest, context: any) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const tbDataFromODS = await retrieveTrialBalanceData(1);
    const staticData = new Map([
      ["segment10", "value1"],
      ["segment8", "value2"],
      ["segment9", "value3"],
    ]);

    const tbDataList = mergeData(tbDataFromODS, staticData);
    context.log(`Successfully merged ${Object.keys(tbDataList).length} data`)

    context.res = {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tbDataList),
    };
    return {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tbDataList),
    };
  },
});