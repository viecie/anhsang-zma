import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	UploadedFile,
	UploadedFiles,
	UseGuards,
    Query,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { ApiBody, ApiConsumes, ApiProperty } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

class FileUploadDto {
	@ApiProperty({ type: "string", format: "binary" })
	fileUpload: any;
}

class FilesUploadDto {
	@ApiProperty({ type: "array", items: { type: "string", format: "binary" } })
	fileUpload: any[];
}

// @UseGuards(AuthGuard("jwt"))
@Controller("product")
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	create(@Body() createProductDto: CreateProductDto) {
		return this.productService.create(createProductDto);
	}

	@Get()
	findAll() {
		return this.productService.findAll();
	}

	// @Get(":id")
	// findOne(@Param("id") id: string) {
	// 	return this.productService.findOne(+id);
	// }

	@Get("search")
	findByName(@Query("key") key: string) {
		return this.productService.findByName(key);
	}

	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateProductDto: UpdateProductDto,
	) {
		console.log({ id });
		return this.productService.update(+id, updateProductDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.productService.remove(+id);
	}

	@Post("order")
	order(@Body() orders: any) {
		return this.productService.orderProduct(orders);
	}

	@UseInterceptors(
		FileInterceptor("fileUpload", {
			storage: diskStorage({
				destination: process.cwd() + "/public/imgs",
				filename: (req, file, callback) =>
					callback(
						null,
						new Date().getTime() + "_" + file.originalname,
					),
			}),
		}),
	)
	@ApiConsumes("multipart/form-data")
	@ApiBody({
		description: "List of cats",
		type: FileUploadDto,
	})
	@Post("upload")
	upload(@UploadedFile() file: FileUploadDto) {
		return file;
	}

	@UseInterceptors(
		FilesInterceptor("fileUpload", 1, {
			storage: diskStorage({
				destination: process.cwd() + "/public/imgs",
				filename: (req, file, callback) =>
					callback(
						null,
						new Date().getTime() + "_" + file.originalname,
					),
			}),
		}),
	)
	@ApiConsumes("multipart/form-data")
	@ApiBody({
		description: "List of cats",
		type: FilesUploadDto,
	})
	@Post("upload-multiple")
	uploadMulti(@UploadedFiles() files: FilesUploadDto) {
		return files;
	}
}
