insert into region(id, name) values (1, 'Durban');
insert into region(id, name) values (2, 'Cape Town');
insert into region(id, name) values (3, 'Gauteng');

insert into taxi(id, regNumber, region_id) values (1, 'ND 708 981', 1), (2, 'ND 908 887', 1), (3, 'ND 765 564', 1);
insert into taxi(id, regNumber, region_id) values (5, 'CA 123 908', 2), (5, 'CY 908 432', 2), (6, 'CA 369 875', 2);
insert into taxi(id, regNumber, region_id) values (7, 'GP 123 342', 3), (8, 'GP 098 564', 3), (9, 'GP 768 543', 3);

insert into route(id, name, fare) values (1, 'Durban Central', 15), (2, 'Umhlanga Rocks', 15), (3, 'Umbilo', 25);
insert into route(id, name, fare) values (4, 'Bellville', 15), (5, 'Gugulethu', 15), (6, 'Langa', 15);
insert into route(id, name, fare) values (7, 'Randburg', 14), (8, 'Sandton', 25), (9, 'Midrand', 15);

insert into trip(route_id, taxi_id) values (1, 1), (2, 1), (3, 1);
insert into trip(route_id, taxi_id) values (2, 3), (1, 3), (2, 3);
insert into trip(route_id, taxi_id) values (3, 2), (1, 2), (2, 2);

