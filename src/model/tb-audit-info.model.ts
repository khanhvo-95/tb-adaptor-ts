interface ITBAuditInfo {
  runID?: number; 
  startID?: number; 
  endID?: number; 
  accountingDate?: Date; 
  reportDate?: Date; 
  type?: string; 
  fileName?: string; 
  location?: string; 
  isSftp?: boolean;
}

class TBAuditInfo {
  constructor(public props: ITBAuditInfo = {}) {}
}

export default TBAuditInfo;
