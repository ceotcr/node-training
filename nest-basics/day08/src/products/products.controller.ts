import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/CreateProductDto';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }
    @Get()
    getProducts() { return this.productsService.getProducts() }

    @Post()
    createProduct(@Body() body: CreateProductDto) { return this.productsService.createProduct(body) }
}

