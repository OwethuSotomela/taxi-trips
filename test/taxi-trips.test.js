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

        assert.deepStrictEqual([], await taxiTrips.findTripsByRegNumber('...'));
        assert.deepStrictEqual([], await taxiTrips.findTripsByRegNumber('***'));

    });

    it('should find the total number of trips by region', async function () {

        const taxiTrips = TaxiTrips(pool);

        assert.deepStrictEqual([], await taxiTrips.findTripsByRegion('Cape Town').length);
        assert.deepStrictEqual([], await taxiTrips.findTripsByRegion('Gauteng').length);
        assert.deepStrictEqual([], await taxiTrips.findTripsByRegion('Gauteng').length);

    });

    it('find the total income for a given reg number', async function () {

        const taxiTrips = TaxiTrips(pool);
        assert.deepStrictEqual(0, await taxiTrips.findIncomeByRegNumber('...').length);
        assert.deepStrictEqual(0, await taxiTrips.findIncomeByRegNumber('***').length);

    });

    it('find the total income for each taxi', async function () {

        const taxiTrips = TaxiTrips(pool);
        assert.deepStrictEqual([{}, {}, {}], await taxiTrips.findTotalIncomePerTaxi());

    });

    it('find the total income for all the taxis', async function () {
        const taxiTrips = TaxiTrips(pool);
        assert.deepStrictEqual(0.00, await taxiTrips.findTotalIncome());
    });


    after(function () {
        pool.end();
    });

});