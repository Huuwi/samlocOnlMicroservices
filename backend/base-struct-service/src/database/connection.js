const mysql2 = require("mysql2/promise")

class Connection {
    constructor(DATABASE_HOST = process.env.DATABASE_HOST, DATABASE_USER_NAME = process.env.DATABASE_USER, DATABASE_PASS_WORD = process.env.DATABASE_PASSWORD, DATABASE_NAME = process.env.DATABASE_NAME, DATABASE_PORT = process.env.DATABASE_PORT) {
        this.DATABASE_HOST = DATABASE_HOST
        this.DATABASE_USER_NAME = DATABASE_USER_NAME
        this.DATABASE_PASSWORD = DATABASE_PASS_WORD
        this.DATABASE_PORT = DATABASE_PORT
        this.DATABASE_NAME = DATABASE_NAME
        this.pool = null

    }

    connect() {
        if (this.pool) {
            console.log("database already createPool!")
            return
        }
        try {
            this.pool = mysql2.createPool({
                host: this.DATABASE_HOST,
                user: this.DATABASE_USER_NAME,
                password: this.DATABASE_PASSWORD,
                database: this.DATABASE_NAME,
                port: this.DATABASE_PORT,
            })
            console.log("create pool successfully pool of database : " + this.DATABASE_NAME);

        } catch (err) {
            console.log("Error when create pool of database " + this.DATABASE_NAME + " err: " + err.message);
        }
    }

    async runTransaction(reqs) {
        if (!this.pool) {
            console.log("Pool not exist, please call connect() first!");
            return;
        }

        const connection = await this.pool.getConnection();
        const rs = [];

        try {
            await connection.beginTransaction();

            for (let e of reqs) {
                const { statement, placeholders } = e;
                const [result] = await connection.execute(statement, placeholders);
                rs.push(result);
            }

            await connection.commit();
            return rs;
        } catch (error) {
            await connection.rollback();
            console.error("Transaction failed:", error);
            throw error;
        } finally {
            connection.release();
        }
    }
    end() {
        if (this.pool) {
            this.pool.end((err) => {
                if (err) {
                    console.error('Lỗi khi đóng pool:', err);
                } else {
                    console.log('Pool đã được đóng và tất cả connection đã bị giải phóng.');
                }
            });
        }
    }

}


module.exports = Connection