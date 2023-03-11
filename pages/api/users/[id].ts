import { NextApiHandler } from "next";
import { Users } from '../../../utils/users';
import prisma from '../../../libs/prisma';

// Reading user info
const handlerGet: NextApiHandler = async (req, res) => {

  const { id } = req.query;

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id as string)
    }
  });

  if (user) {
    res.json({ status: true, user });
    return;
  }

  res.json({ error: 'Usuário não encontrado' });

}


const handlerPut: NextApiHandler = async (req, res) => {
  const { name, active } = req.body;
  const { id } = req.query;


  let data: {
    name?: string;
    active?: boolean;
  } = {};

  if (name) {
    data.name = name;
  }
  if (active) {
    switch (active) {
      case 'true':
      case '1':
        data.active = true;
        break;
      case 'false':
      case '0':
        data.active = false;
        break;
    }
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: parseInt(id as string)
    },
    data
  });

  if (updatedUser) {
    res.json({ status: true, user: updatedUser });
    return;
  }

  res.json({ error: 'não foi possível alterar este usuário' });
}


 
const handlerDelete: NextApiHandler = async (req, res) => {
  const {id} = req.query;
  
  await prisma.user.delete({
    where: {
      id: parseInt(id as string)
    }
  });

  res.json({ status: true});

}


const handler: NextApiHandler = async (req, res) => {

  switch (req.method) {
    case 'GET':
      handlerGet(req, res);
      break;
    case 'PUT':
      handlerPut(req, res);
      break;
      case 'DELETE':
      handlerDelete(req, res);
      break;
  }
}




export default handler;