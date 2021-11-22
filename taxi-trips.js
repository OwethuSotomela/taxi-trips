module.exports = function TaxiTrips(pool) {

    async function totalTripCount() {

    }

    async function findAllRegions() {
        var getRegion = await pool.query(`SELECT * FROM region`)
        // console.log(getRegion.rows)
        return getRegion.rows
    }

    async function findTaxisForRegion(regionName) {

    }

    async function findTripsByRegNumber(regNumber) {

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