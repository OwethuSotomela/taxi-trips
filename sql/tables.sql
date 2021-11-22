drop table if exists route CASCADE;
create table route (
    id serial NOT NULL primary key,

);

drop table if exists taxi CASCADE;
create table taxi (
    id serial NOT NULL primary key,

);

drop table if exists trip CASCADE;
create table trip (
    id serial NOT NULL primary key,

);

drop table if exists region CASCADE;
create table region (
    id serial NOT NULL primary key,
    name text NOT NULL

);