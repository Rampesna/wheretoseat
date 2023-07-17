import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserController } from '../Controllers/User/UserController';
import { AuthController } from '../Controllers/Authentication/AuthController';
import { UserService } from '../Services/Mongoose/UserService';
import { CustomerService } from '../Services/Mongoose/CustomerService';
import { JwtService } from '../Services/Mongoose/JwtService';
import { UserModel, UserSchema } from '../Models/Mongoose/User/UserModel';
import {
  CustomerModel,
  CustomerSchema,
} from '../Models/Mongoose/Customer/CustomerModel';
import {
  JwtTokenModel,
  JwtTokenSchema,
} from '../Models/Mongoose/JwtToken/JwtTokenModel';
import { CustomerController } from '../Controllers/Customer/CustomerController';
import { CompanyService } from '../Services/Mongoose/CompanyService';
import {
  CompanyModel,
  CompanySchema,
} from '../Models/Mongoose/Company/CompanyModel';
import { CompanyController } from '../Controllers/User/CompanyController';
import {
  UserCompanyModel,
  UserCompanySchema,
} from '../Models/Mongoose/User/UserCompany';
import { AuthMiddleware } from '../Middlewares/AuthMiddleware';
import { excludedRoutes } from '../Utils/AuthMiddlewareExclude';
import { CheckUserMiddleware } from '../Middlewares/CheckUserMiddleware';
import { CheckCustomerMiddleware } from '../Middlewares/CheckCustomerMiddleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://127.0.0.1:27017/wheretoseat',
      }),
    }),
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: CustomerModel.name, schema: CustomerSchema },
      { name: JwtTokenModel.name, schema: JwtTokenSchema },
      { name: CompanyModel.name, schema: CompanySchema },
      { name: UserCompanyModel.name, schema: UserCompanySchema },
    ]),
  ],
  controllers: [
    AuthController,
    UserController,
    CustomerController,
    CompanyController,
  ],
  providers: [UserService, CustomerService, CompanyService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(...excludedRoutes)
      .forRoutes('*');

    consumer
      .apply(CheckUserMiddleware)
      .forRoutes(UserController, CompanyController);

    consumer.apply(CheckCustomerMiddleware).forRoutes(CustomerController);
  }
}