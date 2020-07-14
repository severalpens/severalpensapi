create table nodes(
id int not null primary key identity(1,1),
parentId int,
objectTypeId int,
objectId int
)


insert into nodes values(null,1,1)--#1 chat app
insert into nodes values(1,2,1)--#2 sport group
insert into nodes values(1,2,2) --#3 politics group
insert into nodes values(2,3,1) --#4 tennis channel
insert into nodes values(2,3,2) --#5 golf channel
insert into nodes values(3,3,3) --#6 liberal channel
insert into nodes values(3,3,4) --#7 conservative channel




create table objectTypes(
	id int not null primary key identity(1,1),
	name varchar(500),
)
insert into objectTypes values('app');
insert into objectTypes values('group');
insert into objectTypes values('channel');
insert into objectTypes values('message');
insert into objectTypes values('member');

create table apps(
id int not null primary key identity(1,1),
name varchar(500),
description varchar(500)
)

insert into apps values('chat', 'a chat application');

create table users(
id int not null primary key identity(1,1),
name varchar(500),
description varchar(500)
)

insert into users values('Paul','')

create table members(
id int not null primary key identity(1,1),
name varchar(500),
description varchar(500)
)

insert into members values('paul','')


create table groups(
id int not null primary key identity(1,1),
name varchar(500),
description varchar(500)
)

insert into groups values('Sport','')

create table channels(
id int not null primary key identity(1,1),
name varchar(500),
description varchar(500)
)

insert into channels values('Tennis','')

create table messages(
id int not null primary key identity(1,1),
name varchar(500),
description varchar(500)
)

insert into channels values('Hello tennis fans','')