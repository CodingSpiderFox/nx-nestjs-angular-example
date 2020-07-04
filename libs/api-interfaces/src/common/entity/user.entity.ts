import { HmacSHA512 } from 'crypto-js';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { CryptConfig } from '../../server/config/crypto.config';

@Entity({ name: 'user' })
@Unique('uq1', ['username'])
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: 'id' })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: 'username',
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: false,
    comment: 'password',
    select: false,
  })
  password: string;

  @Column({
    name: 'created_at',
    type: 'datetime',
    nullable: false,
    default: () => 'current_timestamp',
    comment: 'DateTime of creation',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'datetime',
    nullable: false,
    default: () => 'current_timestamp',
    onUpdate: 'current_timestamp',
    comment: 'DateTime of update',
  })
  updatedAt: Date;

  constructor(args: { id?: number; username?: string; password?: string }) {
    if (args?.id) {
      this.id = args.id;
    }
    if (args?.username) {
      this.username = args.username;
    }
    if (args?.password) {
      this.password = args.password;
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  onSavePassword() {
    if (this.password) {
      this.password = UserEntity.encryptPassword(this.password);
    }
  }

  static encryptPassword(password: string): string {
    return HmacSHA512(password, CryptConfig.passwordSecret).toString();
  }
}
