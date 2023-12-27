// import { Queries } from '../constant/query-constant';  
// import AuditDetail from '../model/audit-detail.model'; 
// import { db }  from '../configuration/db.config';

// class AuditDAO {

//     constructor() {}

//     async saveAuditDetails(auditDetail: AuditDetail, context?: any): Promise<void> {
//         context.log("Start save audit details process.")
//         const { runID, startID, endID, accountingDate, reportDate, type, fileName, location, isSftp } = auditDetail.detail;
//         const result = await db.promise().execute(Queries.SAVE_AUDIT_DETAILS, [
//             runID,
//             startID,
//             endID,
//             accountingDate,
//             reportDate,
//             type,
//             fileName,
//             location,
//             isSftp,
//         ]);
//         context.log(`Save successfully elements: "${result}"`)
//         context.log("End save audit details process.")
//     }
// }

// export default AuditDAO;