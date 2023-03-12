import { NextApiHandler } from "next";
import { Users } from '../../../utils/users';
import prisma from '../../../libs/prisma';

const handlerGet: NextApiHandler = async (req, res) => {

    const {page} = req.query;

    //itens por página
    let take = 4;

    //offset of items
    let skip = 0;
    if(page){
        skip = (parseInt(page as string) - 1) * take;
    }


    const users = await prisma.user.findMany({
        skip,
        take,

        where: {
           active: true
        },
        select: {
            id: true,
            name: true,
            email: true,
            active: true,
        },
        orderBy: {
            id: 'asc'
        }
    }
    );
    res.json({ status: true, users: users });

}


const handlerPost: NextApiHandler = async (req, res) => {
    const { name, email } = req.body;

    const newUser = await prisma.user.create({
        data: { name, email }
    });


    res.status(201).json({ status: true, user: newUser });

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