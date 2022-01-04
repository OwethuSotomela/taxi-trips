module.exports = function TaxiTrips(pool) {

    async function totalTripCount() {
        var tripMade = await pool.query(`SELECT COUNT(*) FROM trip`)
        return tripMade.rows[0].count;
    }

    async function findAllRegions() {
        var getRegion = await pool.query(`SELECT * FROM region`)
        return getRegion.rows
    }

    async function findTaxisForRegion(regionName) {
        var getRegion = await pool.query(`SELECT * FROM region where name = $1`, [regionName])
        var getAllTaxis = await pool.query(`SELECT * from taxi where region_id = ${getRegion.rows[0].id}`)
        return getAllTaxis.rows;
    }
    
    async function findTripsByRegNumber(regNumber) {
        var getRegNumber = await pool.query(`SELECT * FROM taxi WHERE regNumber = $1`, [regNumber])
        var getTripsByRegNumber = await pool.query(`SELECT * FROM trip WHERE taxi_id = $1`, [getRegNumber.rows[0].id])
        return getTripsByRegNumber.rows;

    }

    async function findTripsByRegion(regionName) {

    }

    async function findIncomeByRegNumber(regNumber) {

    }

    async function findTotalIncomePerTaxi() {

    }

    async function findTotalIncome() {

    }

    async function findTotalIncomeByRegion() {

    }

    return {
        totalTripCount,
        findAllRegions,
        findTaxisForRegion,
        findTripsByRegNumber,
        findTripsByRegion,
        findIncomeByRegNumber,
        findTotalIncomePerTaxi,
        findTotalIncome,
        findTotalIncomeByRegion
    }

}