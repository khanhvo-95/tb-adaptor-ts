interface ITBDataProps {
    statusCode?: number;
    ledgerID?: number;
    effectiveDateOfTransaction?: string;
    listID?: number;
    accountingDate?: string;
    journalSource?: string;
    journalCategory?: string;
    currencyCode?: string;
    journalEntryCreationDate?: string;
    interfaceGroupIdentifier?: string;
    actualFlag?: boolean;
    segment1?: string;
    segment2?: string;
    segment3?: string;
    segment4?: string;
    segment5?: string;
    segment6?: string;
    segment7?: string;
    segment8?: string;
    segment9?: string;
    segment10?: string;
    segment11?: string;
    segment12?: string;
    segment13?: string;
    segment14?: string;
    segment15?: string;
    segment16?: string;
    segment17?: string;
    segment18?: string;
    segment19?: string;
    segment20?: string;
    segment21?: string;
    segment22?: string;
    segment23?: string;
    segment24?: string;
    segment25?: string;
    segment26?: string;
    segment27?: string;
    segment28?: string;
    segment29?: string;
    segment30?: string;
    enteredDebitAmount?: number;
    enteredCreditAmount?: number;
    convertedDebitAmount?: number;
    convertedCreditAmount?: number;
    reference1?: string;
    reference2?: string;
    reference3?: string;
    reference4?: string;
    reference5?: string;
    reference6?: string;
    reference7?: string;
    reference8?: string;
    reference9?: string;
    reference10?: string;
    referenceColumn1?: string;
    referenceColumn2?: string;
    referenceColumn3?: string;
    referenceColumn4?: string;
    referenceColumn5?: string;
    referenceColumn6?: string;
    referenceColumn7?: string;
    referenceColumn8?: string;
    referenceColumn9?: string;
    referenceColumn10?: string;
    attribute1?: string; 
    reconciliationReference?: string
  }

  export {ITBDataProps}
  
  class TBData {
    constructor(public props: ITBDataProps = {}) {}
  }
  
  export default TBData;