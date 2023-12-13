import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import TBData, { ITBDataProps } from "../model/tb-data.model";
import TBAuditInfo from "../model/tb-audit-info.model";
import CommonUtil from "../util/common-util";

export async function processTbAuditInfo(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const dataEntry: any = await request.json(); 
  const tbAuditInfo = new TBAuditInfo();

  const data: Map<string, Array<ITBDataProps>> = new Map(Object.entries(dataEntry.data));
  const accountingDate: string = Array.from(data.keys())[0];
  const tbDataForAccountingDate: Array<ITBDataProps> = data.get(accountingDate);

  const optionalStartID: number = tbDataForAccountingDate
    .map((tbData: ITBDataProps) => tbData.listID)
    .sort()[0];
  if (optionalStartID) tbAuditInfo.props.startID = optionalStartID;

  const optionalEndID: number = tbDataForAccountingDate
    .map((tbData: ITBDataProps) => tbData.listID)
    .sort()[tbDataForAccountingDate.length - 1];

  if (optionalEndID) tbAuditInfo.props.endID = optionalEndID;

  tbAuditInfo.props.runID = dataEntry.runID;
  tbAuditInfo.props.accountingDate = CommonUtil.asSqlDate(accountingDate);
  tbAuditInfo.props.reportDate = CommonUtil.getSqlDate();

  return {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tbAuditInfo),
  };
}

app.http("process-tb-audit-info", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "tbAuditInfo",
  handler: processTbAuditInfo,
});
