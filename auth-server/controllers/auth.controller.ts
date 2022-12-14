import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { ResUser } from '../entities/ResUser.entity';
import { generateJWT } from '../helpers/jwt';


export const createUser = async (req: Request, res: Response) => {

    try {

        const { email, password, vat } = req.body;

        // Verify Email and Vat
        let user = await ResUser.findOne({where: [{email}]});
        if(user) return res.status(400).json({msg:"The vat is already registered"})

        user = await ResUser.findOne({where: [{vat}]});
        if(user) return res.status(400).json({msg:"The vat is already registered"})

        // Create user
        const dbUser = ResUser.create(req.body);
        
        // Hash password
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );

        await dbUser.save()

        // Generate JWT

        const token = await generateJWT(dbUser.id, dbUser.first_name, dbUser.last_name)

        // Success Response

        return res.status(201).json({
            id: dbUser.id,
            token,
            name: `${dbUser.first_name} ${dbUser.last_name}`
        })

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }

}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const dbUser = await ResUser.findOneBy({email});

        if(!dbUser) return res.status(400).send({msg: '(Email) or password is not valid'})

        // Password match
        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if(!validPassword) return res.status(400).send({msg: 'Email or (password) is not valid'})

        const token = await generateJWT(dbUser.id, dbUser.first_name, dbUser.last_name)
        
        // Success Response

        return res.json({
            id: dbUser.id,
            token,
            name: `${dbUser.first_name} ${dbUser.last_name}`
        })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
}

export const renewToken = async (req: Request, res: Response) => {
    try {
        
        const { id, first_name, last_name } = req;

        const newToken = await generateJWT(id, first_name, last_name);

        return res.json({
            id,
            first_name,
            last_name,
            token: newToken
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
}
