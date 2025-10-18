import { Injectable } from "@nestjs/common";
import { CreateKiotvietDto } from "./dto/create-kiotviet.dto";
import { UpdateKiotvietDto } from "./dto/update-kiotviet.dto";
import { kiotvietApi } from "./kiotviet.api";
import { error } from "console";

@Injectable()
export class KiotvietService {
	create(createKiotvietDto: CreateKiotvietDto) {
		return "This action adds a new kiotviet";
	}

	async getInvoiceDetail(code: string) {
		const res = await kiotvietApi.get(`invoices/code/${code}`)
        return res.data
	}
}
