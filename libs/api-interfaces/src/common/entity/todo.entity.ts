import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'todo' })
@Unique('uq1', ['title'])
export class TodoEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, comment: 'title' })
  title: string;

  @Column({
    type: 'bool',
    nullable: false,
    default: false,
    comment: 'completion flag',
  })
  complete: boolean = false;

  @Column({ type: 'date', nullable: false, comment: 'deadline' })
  deadline: Date;

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

  constructor(args: {
    id?: number;
    title?: string;
    complete?: boolean;
    deadline?: Date;
    updatedAt?: Date;
  }) {
    if (args?.id) {
      this.id = args.id;
    }
    if (args?.title) {
      this.title = args.title;
    }
    if (args?.complete) {
      this.complete = args.complete;
    }
    if (args?.deadline) {
      this.deadline = args.deadline;
    }
    if (args?.updatedAt) {
      this.updatedAt = args.updatedAt;
    }
  }
}
