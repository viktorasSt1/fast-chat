const users = [];

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);

    //TODO cia kazkur yra klaida del user name, programa crashina kai ivedami vienodi vardai ir bandoma prisijunngti
    if(existingUser){
        return {error: 'Username is taken try something else!'}
    }

    const user = {id, name, room};
    users.push(user);

    return {user};
}

const removeUser = (id) => {
    const index = users.findIndex((user)=> user.id === id);

    if(index !== -1){
        return users.splice(index, )[0];
    }
}

const getUser = (id) => users.find((user)=> user.id === id);


const getUsersInRoom = (room) => users.filter((user)=>user.room === room);

module.exports = {addUser, removeUser, getUser, getUsersInRoom};