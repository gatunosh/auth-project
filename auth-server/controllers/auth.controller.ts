import { Request, Response } from 'express';


export const createUser = (req: Request, res: Response) => {

    const { email, first_name, last_name, password } = req.body;

    console.log(email);

    res.json({
        msg: 'Create user/ new'
    })
}

export const login = (req: Request, res: Response) => {

    const { email, password } = req.body;

    console.log(email);
    console.log(password);

    res.json({
        msg: 'User login'
    })
}

export const renewToken = (req: Request, res: Response) => {
    res.json({
        msg: 'Renew'
    })
}
