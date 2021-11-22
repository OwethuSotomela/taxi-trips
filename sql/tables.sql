drop table if exists route CASCADE;
create table route (
    id serial NOT NULL primary key,
    name text NOT NULL,
    fare decimal(10,2) NOT NULL
);

-- drop table if exists region CASCADE;
create table region (
    id serial NOT NULL primary key,
    name text NOT NULL
);

drop table if exists taxi CASCADE;
create table taxi (
    id serial NOT NULL primary key,
    regNumber varchar(255) NOT NULL,
    region_id int NOT NULL,
    foreign key (region_id) references region(id)
);

-- drop table if exists trip CASCADE;
create table trip (
    id serial NOT NULL primary key,
    route_id int NOT null,
    taxi_id int NOT NULL,
    foreign key (route_id) references route(id),
    foreign Key (taxi_id) references taxi(id)
);

























