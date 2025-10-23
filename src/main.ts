import express, { Request, Response } from 'express';
import pgp from 'pg-promise';

async function main() {
    const connection = pgp()({
        host: 'localhost',
        port: 5432,
        database: 'app',
        user: 'postgres',
        password: 'postgres'
    });
    const app = express();
    app.use(express.json());

    app.post("/signup", async(req: Request, res: Response) => {
        const accountId = crypto.randomUUID();
        console.log(req.body);
        await connection.query(
            `INSERT INTO ccca.account (account_id, name, email, document, password)
                VALUES($1, $2, $3, $4, $5)
        `, [
            accountId,
            req.body.name,
            req.body.email,
            req.body.document,
            req.body.password
        ]);

        res.json({
            accountId
        });
    });

    app.get("/accounts/:accountId", async(req: Request, res: Response) => {
        const account = await connection.one(
            `SELECT account_id, name, email, document
                FROM ccca.account
                WHERE account_id = $1
        `, [
            req.params.accountId
        ]);

        res.json(account);
    });

    app.listen(3000);
}

main();