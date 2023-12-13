interface IAuditDetail {
  runID: number;
  startID: number;
  endID: number;
  accountingDate: Date;
  reportDate: Date;
  type: string;
  fileName: string;
  location: string;
  isSftp: boolean;
}

export { IAuditDetail };

class AuditDetail {
  constructor(public detail: IAuditDetail) {}
}

export default AuditDetail;
