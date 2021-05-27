async function queryAllCompanies(db) {
    let sql = `SELECT * FROM companies`;
    return await db.run(sql);
};

exports.queryAllCompanies = queryAllCompanies;