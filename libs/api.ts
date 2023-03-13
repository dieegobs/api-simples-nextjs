import prisma from './prisma';

export default {
    getAllUsers: async (page: number) => {

        //itens por página
        let take = 4;

        //offset of items
        let skip = 0;
        if (page) {
            skip = (page - 1) * take;
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

        return users;


    }
}