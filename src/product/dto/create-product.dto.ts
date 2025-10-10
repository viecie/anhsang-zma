import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    product_name: string
    
    @ApiProperty({default: 10000})
    @IsNumber()
    price: number

    @ApiProperty()
    manufacturer: string | null
    
    @ApiProperty()
    attribtes: string
}
