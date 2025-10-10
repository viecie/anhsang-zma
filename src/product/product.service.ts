import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
// import { PrismaService } from "src/prisma/prisma.service";
import { PrismaMysqlService } from "src/prisma/prisma-mysql.service";

@Injectable()
export class ProductService {
	constructor(
		// private prisma: PrismaService,
		private prismaMySQL: PrismaMysqlService,
	) {}

	create(createProductDto: CreateProductDto) {
		const newProduct = this.prismaMySQL.products.create({
			data: createProductDto,
		});
		return newProduct;
	}

	findAll() {
		return this.prismaMySQL.products.findMany();
	}

	findOne(id: number) {
		return this.prismaMySQL.products.findUnique({
			where: {
				id: id,
			},
		});
	}

	findByName(key: string) {
		return this.prismaMySQL.products.findMany({
			where: {
				name: {
					contains: key,
					// mode: "insensitive", // không phân biệt hoa thường, có thể bỏ nếu muốn exact case
				},
			},
		});
	}

	update(id: number, updateProductDto: UpdateProductDto) {
		const product = this.prismaMySQL.products.update({
			where: {
				id: id,
			},
			data: updateProductDto,
		});
		return product;
	}

	async remove(id: number) {
		await this.prismaMySQL.products.delete({
			where: {
				id,
			},
		});
		return `This action removes a #${id} product`;
	}

	async orderProduct(orders) {
		// const newOrder = this.prismaMySQL.orders.create({
		// 	data: { ...orders, order_date: new Date() },
		// });
		// return newOrder;
	}
}
