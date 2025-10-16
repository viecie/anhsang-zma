import { Injectable } from "@nestjs/common";
import { CreateZaloDto } from "./dto/create-zalo.dto";
import { UpdateZaloDto } from "./dto/update-zalo.dto";

@Injectable()
export class ZaloService {
    private webhookUrl = "https://hooks.slack.com/services/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"
	create(createZaloDto: CreateZaloDto) {
		// fetch("https://hooks.slack.com/services/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", )
		return "This action adds a new zalo";
	}

	findAll() {
		return `This action returns all zalo`;
	}

	findOne(id: number) {
		return `This action returns a #${id} zalo`;
	}

	update(id: number, updateZaloDto: UpdateZaloDto) {
		return `This action updates a #${id} zalo`;
	}

	remove(id: number) {
		return `This action removes a #${id} zalo`;
	}

	async sendMessage(text: string) {
		try {
			const res = await fetch(this.webhookUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ text }),
			});

			if (!res.ok) {
				const msg = await res.text();
				console.error("❌ Slack Error:", msg);
				throw new Error(`Slack returned ${res.status}`);
			}

			console.log("✅ Sent to Slack successfully");
			return { success: true };
		} catch (err) {
			console.error("❌ Slack send failed:", err);
			throw err;
		}
	}
}
