export class KiotVietWebhookRequest {
  Id: string;
  Attempt: number;
  Notifications: KiotVietNotification[];
}

export class KiotVietNotification {
  Action: string; // e.g. "invoice.update.500255439"
  Data: KiotVietInvoiceUpdate[];
}

export class KiotVietInvoiceUpdate {
  __type: string;
  Id: number;
  Code: string;
  PurchaseDate: string;
  BranchId: number;
  BranchName: string;
  SoldById: number;
  SoldByName: string;
  CustomerId: number;
  CustomerCode: string;
  CustomerName: string;
  Total: number;
  TotalPayment: number;
  Discount: number;
  DiscountRatio: number;
  Status: number;
  StatusValue: string;
  Description: string;
  UsingCod: boolean;
  ModifiedDate: string;
  InvoiceDetails: InvoiceDetail[];
  Payments: Payment[];
}

export class InvoiceDetail {
  ProductId: number;
  ProductCode: string;
  ProductName: string;
  Quantity: number;
  Price: number;
  Discount: number;
}

export class Payment {
  // Extend when KiotViet sends payment details
}
