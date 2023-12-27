// import AuditDAO from "../dao/audit-dao";
import AuditDetail, { IAuditDetail } from "../model/audit-detail.model";
import TBAuditInfo from "../model/tb-audit-info.model";

interface ITBAuditInfo {
  runId: number;
  flag1: number;
  flag2: number;
  accountingDate: Date;
  reportDate: Date;
  type: string;
  fileName: string;
  location: string;
  isSftp: boolean;
}

class TBAdaptorProcessor {
  constructor() {}

  async process(message: string, context: any): Promise<Map<string, null>[]> {
    // const auditDAO = new AuditDAO();

    const ITBAuditInfo: IAuditDetail = {
      runID: 1, // runID - set it to null/false to auto-increment (if your table is configured that way)
      startID: 1,
      endID: 1,
      accountingDate: new Date(),
      reportDate: new Date(),
      type: "type_value",
      fileName: "fileName_value",
      location: "location_value",
      isSftp: true,
    };

    const auditInfo = new AuditDetail(ITBAuditInfo);

    // await auditDAO.saveAuditDetails(auditInfo, context);
    return [new Map([["test", null]])];
  }
}

export default TBAdaptorProcessor;
