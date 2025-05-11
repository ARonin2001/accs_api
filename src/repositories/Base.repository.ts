import { Injectable } from '@nestjs/common';
import { BaseEntity } from 'src/entities/BaseEntities/BaseEntity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BaseRepository<T extends BaseEntity> extends Repository<T> {}
