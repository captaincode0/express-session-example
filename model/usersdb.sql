create table users (
	id integer primary key autoincrement,
	email varchar(45) not null,
	pass char(12) not null
);

insert into users values(null, "amy@nasa.gov", "mycat1234");
insert into users values(null, "john@nasa.gov", "123456");