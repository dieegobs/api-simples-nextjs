import {NextApiHandler} from "next";
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

      if(user){
        res.json({status: true, user});
        return;
      }

      res.json({ error: 'Usuário não encontrado' });

}


const handlerPut: NextApiHandler = async (req, res) => {
    const {name, active} = req.body;
    const {id} = req.query;

    const updatedUser = await prisma.user.update({
      where:{
        id: parseInt(id as string)
      },
      data: {
        name, 
        active: active === 'true' ? true : false
      }
    });

    if(updatedUser){
      res.json({status: true, user: updatedUser});
      return;
    }

    res.json({error: 'não foi possível alterar este usuário'});


}

const handler: NextApiHandler = async (req, res) => {

  switch(req.method){
    case 'GET':
      handlerGet(req, res);
      break;
      case 'PUT':
      handlerPut(req, res);
      break;
  }
}




export default handler;