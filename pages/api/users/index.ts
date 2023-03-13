import { NextApiHandler } from "next";
import { Users } from '../../../utils/users';
import prisma from '../../../libs/prisma';
import api from '../../../libs/api';

const handlerGet: NextApiHandler = async (req, res) => {

    const {page} = req.query;
    const users = await api.getAllUsers(parseInt(page as string));    
    res.json({ status: true, users: users });

}


const handlerPost: NextApiHandler = async (req, res) => {
    const { name, email } = req.body;

    const newUser = await prisma.user.create({
        data: { name, email }
    }).catch(()=> {
        res.json({error: 'Usuário já existe'});
    });

    if (newUser) {
        res.status(201).json({ status: true, user: newUser });
    }
}


const handler: NextApiHandler = async (req, res) => {
    switch (req.method) {
        case 'GET':
            handlerGet(req, res);
            break
        case 'POST':
            handlerPost(req, res);
            break;
    }

}


export default handler;