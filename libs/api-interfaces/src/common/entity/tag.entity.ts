import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'tag' })
@Unique('uq1', ['name'])
export class TagEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: 'id' })
  id: number;

  @Column({
    type: 'bigint',
    unsigned: true,
    nullable: false,
    comment: 'todo id',
  })
  todoId: number;

  @Column({ type: 'varchar', length: 50, nullable: false, comment: 'name' })
  name: string;

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

  constructor(args: { id?: number; name?: string; updatedAt?: Date }) {
    if (args?.id) {
      this.id = args.id;
    }
    if (args?.name) {
      this.name = args.name;
    }
    if (args?.updatedAt) {
      this.updatedAt = args.updatedAt;
    }
  }
}
