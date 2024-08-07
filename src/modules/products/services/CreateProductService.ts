import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "../../../shared/errors/AppError";
import Product from "../typeorm/entities/Product";


interface IRequest{
    name: string;
    price: number;
    quantity: number;
}

class CreateProductService{
    public async execute({name, price, quantity}:IRequest): Promise<Product>{
        const productsRepository = getCustomRepository(ProductRepository);
        const productsAlreadyExists = await productsRepository.findByName(name);

        if(productsAlreadyExists){
            throw new AppError('There is already one product with this name', 409);
        }

        const product = productsRepository.create({name, price, quantity});

        await productsRepository.save(product);

        return product;
    }
}

export default CreateProductService;