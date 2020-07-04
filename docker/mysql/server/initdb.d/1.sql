create table if not exists user(
  id bigint unsigned not null auto_increment comment 'id',
  username varchar(50) not null comment 'username',
  password varchar(191) not null comment 'password',
  created_at datetime not null default current_timestamp comment 'created_at',
  updated_at datetime not null default current_timestamp on update current_timestamp comment 'updated_at',
  primary key(id),
  unique key uq1(username)
) engine=innodb charset=utf8mb4 comment='user';

create table if not exists todo(
  id bigint unsigned not null auto_increment comment 'id',
  title varchar(50) not null comment 'title',
  complete boolean not null default false comment 'complete',
  deadline date not null comment 'deadline',
  created_at datetime not null default current_timestamp comment 'created_at',
  updated_at datetime not null default current_timestamp on update current_timestamp comment 'updated_at',
  primary key(id),
  unique key uq1(title)
) engine=innodb charset=utf8mb4 comment='todo';

create table if not exists tag(
  id bigint unsigned not null auto_increment comment 'id',
  todo_id bigint unsigned not null comment 'id',
  name varchar(100) not null comment 'name',
  created_at datetime not null default current_timestamp comment 'created_at',
  updated_at datetime not null default current_timestamp on update current_timestamp comment 'updated_at',
  primary key(id),
  unique key uq1(name)
) engine=innodb charset=utf8mb4 comment='tag';

alter table tag
add constraint tag_todo_fk1 foreign key (todo_id) references todo(id)
;
