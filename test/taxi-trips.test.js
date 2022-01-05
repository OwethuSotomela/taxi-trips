let assert = require("assert");
let TaxiTrips = require("../taxi-trips");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/travis_ci_test';

const pool = new Pool({
    connectionString
});

describe('Taxi Trips', function () {

    // beforeEach(async function () {

    // });

    it('should find how many trips all the taxis made', async function () {

        const taxiTrips = TaxiTrips(pool);
        // console.log(await taxiTrips.totalTripCount())
        assert.deepEqual(9, await taxiTrips.totalTripCount());


    });

    it('should find all the regions', async function () {

        const taxiTrips = TaxiTrips(pool);

        assert.deepStrictEqual([
            {
                "id": 1,
                "name": "Durban",
            },
            {
                "id": 2,
                "name": "Cape Town",
            },
            {
                "id": 3,
                "name": "Gauteng",
            }]
            , await taxiTrips.findAllRegions());

    });

    it('should find all the taxis for a region', async function () {
        const taxiTrips = TaxiTrips(pool);

        assert.deepStrictEqual([

            { id: 1, regnumber: 'ND 708 981', region_id: 1 },
            { id: 2, regnumber: 'ND 908 887', region_id: 1 },
            { id: 3, regnumber: 'ND 765 564', region_id: 1 }

        ], await taxiTrips.findTaxisForRegion('Durban'));
        // assert.deepStrictEqual([3], await taxiTrips.findTaxisForRegion('Cape Town'));
        // assert.deepStrictEqual([6], await taxiTrips.findTaxisForRegion('Gauteng'));

    })

    it('should find all the trips for a reg number', async function () {

        const taxiTrips = TaxiTrips(pool);

        assert.deepStrictEqual([
            {
                "id": 1,
                "route_id": 1,
                "taxi_id": 1
            },
            {
                "id": 2,
                "route_id": 2,
                "taxi_id": 1
            },
            {
                "id": 3,
                "route_id": 3,
                "taxi_id": 1
            }
        ], await taxiTrips.findTripsByRegNumber('ND 708 981'));

        assert.deepStrictEqual([
            {
                "id": 7,
                "route_id": 3,
                "taxi_id": 2
            },
            {
                "id": 8,
                "route_id": 1,
                "taxi_id": 2
            },
            {
                "id": 9,
                "route_id": 2,
                "taxi_id": 2
            }

        ], await taxiTrips.findTripsByRegNumber('ND 908 887'));

    });

    // it('should find the total number of trips by region', async function () {

    //     const taxiTrips = TaxiTrips(pool);

    //     assert.deepStrictEqual([9], await taxiTrips.findTripsByRegion('Cape Town').length);
        // assert.deepStrictEqual([], await taxiTrips.findTripsByRegion('Gauteng').length);
        // assert.deepStrictEqual([], await taxiTrips.findTripsByRegion('Gauteng').length);

    // });

    // it('find the total income for a given reg number', async function () {

    //     const taxiTrips = TaxiTrips(pool);
    //     assert.deepStrictEqual(0, await taxiTrips.findIncomeByRegNumber('ND 908 887').length);
    //     assert.deepStrictEqual(0, await taxiTrips.findIncomeByRegNumber('***').length);

    // });

    // it('find the total income for each taxi', async function () {

    //     const taxiTrips = TaxiTrips(pool);
    //     assert.deepStrictEqual([{}, {}, {}], await taxiTrips.findTotalIncomePerTaxi());

    // });

    it('find the total income for all the taxis', async function () {
        const taxiTrips = TaxiTrips(pool);
        assert.deepStrictEqual(155, await taxiTrips.findTotalIncome());
    });


    after(function () {
        pool.end();
    });

});