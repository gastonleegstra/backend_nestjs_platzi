import { plainToInstance } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsNumber,
  Max,
  Min,
  validateSync,
} from 'class-validator';

enum Environment {
  dev = 'dev',
  qa = 'qa',
  prod = 'prod',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  DATABASE: DatabaseVariables;
}

class DatabaseVariables {
  @IsNumber()
  @Min(0)
  @Max(65535)
  DATABASE_PORT: number;

  @IsNumber()
  DATABASE_HOST: number;

  @IsString()
  DATABASE_USER: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  DATABASE_TYPE: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
