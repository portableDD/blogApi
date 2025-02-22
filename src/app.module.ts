import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
// import { User } from './users/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guard/access-token/access-token.guard';
import jwtConfig from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationGuard } from './auth/guard/auth-guard/auth-guard.guard';
import { MailModule } from './mail/mail.module';
import { PaginationModule } from './common/pagination/pagination.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.development'] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        // entities: [User],
        synchronize: configService.get('POSTGRES_SYNC'),
        autoLoadEntities: configService.get('POSTGRES_LOAD'),
      }),
    }),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UsersModule,
    PostModule,
    TagsModule,
    MetaOptionsModule,
    AuthModule,
    MailModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthenticationGuard,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: DataResponseInterceptor,
    // },
    // AccessTokenGuard,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
