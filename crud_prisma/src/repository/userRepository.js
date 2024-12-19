const prismaClient = require("@prisma/client");
const prisma = new prismaClient.PrismaClient();

const repository = {};

repository.findAllUsers = async (page, limit) => {
    const users = await prisma.user.findMany({
        // index de début
        skip: (page -1) * limit,
        take: limit,
        orderBy : {
            id: 'asc'
        }
    });

    let userCount = await prisma.user.count();

    return {
        totalPages: Math.ceil(userCount / limit),
        currentPage : page,
        limit: limit,
        links: {
            previous: `http://localhost:3000/users?page=${page-1}&limit=${limit}`,
            current: `http://localhost:3000/users?page=${page}&limit=${limit}`,
            next: `http://localhost:3000/users?page=${page+1}&limit=${limit}`
        },
        users: users
    };
};

repository.findUserById = async (id) => {
    return await prisma.user.findUnique({where: {id}});
};

repository.findUsersByName = async (name) => {
    return await prisma.user.findMany({ where: { name: {
            // matche avec les substrings
            contains : name,
            // insensible à la casse
            mode: 'insensitive'
        }
    }
});
};

repository.createUser = async (data) => {
    return await prisma.user.create({data});
};

repository.updateUser = async (id, data) => {
    return await prisma.user.update({where: {id}, data});
};

repository.deleteUser = async (id) => {
    return await prisma.user.delete({where: {id}});
};

module.exports = repository;