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
        var getRegion = pool.query(`SELECT * FROM region WHERE name = $1`, [regionName])
        var getTripsByRegion = pool.query(`SELECT * FROM trip WHERE route_id = $1`, [getRegion.rows[0].id])
        // console.log(getRegion.rows[0].id);
        // console.log(getTripsByRegion.rows[0].id)
        return getTripsByRegion.rows;
    }

    async function findIncomeByRegNumber(regNumber) {
        var getRegNumber = await pool.query(`SELECT * FROM taxi WHERE regNumber = $1`, [regNumber])
        var getTrips = await pool.query(`SELECT * FROM trip WHERE taxi_id = $1`, [getRegNumber.rows[0].id])
        var totalPrice = 0
        for (const element of getTrips.rows) {
            var getFare = await pool.query(`SELECT fare FROM route WHERE id = $1`, [element.route_id])
            totalPrice += parseFloat(getFare.rows[0].fare)
        }
        return totalPrice;
    }

    async function findTotalIncomePerTaxi() {
        var getTrips = await pool.query(`SELECT * FROM trip`)
        var taxiAmount = await pool.query(`SELECT regnumber, id FROM taxi`)
        taxiAmount.rows.forEach(element => {
            element["price"] = 0
        });
        for (const element of getTrips.rows) {
            var getFare = await pool.query(`SELECT fare FROM route WHERE id = $1`, [element.route_id])
            taxiAmount.rows.forEach(taxi => {
                if (taxi.id == element.taxi_id) {
                    taxi["price"] += parseFloat(getFare.rows[0].fare)
                }
            });
        }
        console.log(taxiAmount.rows)
        return taxiAmount.rows;
    }

    async function findTotalIncome() {
        var getTrips = await pool.query(`SELECT * FROM trip`)
        var totalPrice = 0
        for (const element of getTrips.rows) {
            var getFare = await pool.query(`SELECT fare FROM route WHERE id = $1`, [element.route_id])
            totalPrice += parseFloat(getFare.rows[0].fare)
        }
        return totalPrice;
    }

    async function findTotalIncomeByRegion(regionName) {
        var getRegion = await pool.query(`SELECT * FROM region WHERE name = $1`, [regionName])
        console.log(getRegion.rows)

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