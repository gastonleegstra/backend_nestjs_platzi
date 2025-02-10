import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic'; //Clave para marcar una ruta como publica

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true); //Decorador para marcar una ruta como publica
