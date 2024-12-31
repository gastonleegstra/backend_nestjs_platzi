import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//enfoque estatico y archivo config tipado
import { ConfigType } from '@nestjs/config';

//enfoque dinamico
//import { ConfigModule, ConfigService } from '@nestjs/config';

import config from 'config';

@Global()
@Module({
  //Configuracion de la base de datos con el modulo de typeorm usando
  // el ConfigType y config enfoque estatico con archivo tipado
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>): any => {
        const { host, port, username, password, database, type} = configService.database;
        return {
          type,
          host,
          port,
          username,
          password,
          database,
          synchronize: false,
          autoLoadEntities: true
        };
      }
    })
  ],
  exports: [TypeOrmModule]

  //Configuracion de la base de datos con el modulo de typeorm usando
  // el ConfigModule y ConfigService enfoque dinamico
  // imports: [
  //   ConfigModule.forRoot(),
  //   TypeOrmModule.forRootAsync({
  //     imports: [ConfigModule],
  //     inject: [ConfigService],
  //     useFactory: (configService: ConfigService): any => {
  //       const host = configService.get<number>('DATABASE_HOST');
  //       const port = configService.get<number>('DATABASE_PORT');
  //       const username = configService.get<string>('DATABASE_USER');
  //       const password = configService.get<string>('DATABASE_PASSWORD');
  //       const database = configService.get<string>('DATABASE_NAME');
  //       const type = configService.get<string>('DATABASE_TYPE');
  //       return {
  //         type,
  //         host,
  //         port,
  //         username,
  //         password,
  //         database
  //       };
  //     }
  //   })
  // ],
})
export class DataModule {}
