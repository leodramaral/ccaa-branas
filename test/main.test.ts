import axios from "axios"

test("Create a new account", async () => {
    const input = {
        name: 'Daniel Silva',
        email: 'daniel.silva3@gmail.com',
        document: '12345678910',
        password: '123senha!'
    }

    const responseSignout = await axios.post("http://localhost:3000/signup", input)
    expect(responseSignout.status).toBe(200);
    const output = responseSignout.data;
    expect(output.accountId).toBeDefined();

    const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${output.accountId}`)
    expect(responseGetAccount.status).toBe(200);
    const account = responseGetAccount.data;
    expect(account.name).toBe(input.name);
    expect(account.email).toBe(input.email);
    expect(account.document).toBe(input.document);
});
