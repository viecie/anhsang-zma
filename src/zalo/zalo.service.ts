import { Injectable } from "@nestjs/common";
import { KiotVietWebhookRequest } from "./dto/invoice-zalo.dto";
import axios from "axios";
import { kiotvietApi } from "src/kiotviet/kiotviet.api";
import { KiotvietService } from "src/kiotviet/kiotviet.service";
import { zaloApi } from "./zalo.api";

@Injectable()
export class ZaloService {
	constructor(private kiotViet: KiotvietService) {}

	private slackUrl = process.env.SLACK_URL || "";

	async sendMessage(reqBody: KiotVietWebhookRequest) {
		try {
			const data = reqBody.Notifications[0].Data[0];
			const action = reqBody.Notifications[0].Action;
			console.log({ action });
			const text = data.Description || "undefined";

			// Get invoice detail
			const invoiceCode = data.Code;
			// const kiot = await kiotvietApi.get(`/invoices/code/${invoiceId}`)
			// console.log(kiot.data)
			const invoice = await this.kiotViet.getInvoiceDetail(invoiceCode);
			const invoiceDetails = invoice.invoiceDetails;
			const soldProducts = invoiceDetails.map((i) => {
				return {
					key: i.productName,
					value: i.note,
				};
			});
			const zaloConfig = {
				recipient: {
					user_id: "7210091149305604338",
				},
				message: {
					// text: "Hello from backend"
					attachment: {
						type: "template",
						payload: {
							template_type: "transaction_account",
							elements: [
								{
									title: "Bảo Hành Điện Tử",
									// subtitle: "Đang yêu cầu thông tin từ bạn",
								},
								{
									type: "table",
									content: soldProducts,
								},
							],
						},
					},
				},
			};
			await zaloApi
				.post("/message/cs", zaloConfig)
				.then((res) => {
					console.log(res.status);
				})
				.catch((e) => {
					throw new Error(e);
				});

			return { success: true };
		} catch (err) {
			console.error("❌ Slack send failed:", err);
			throw err;
		}
	}
}
