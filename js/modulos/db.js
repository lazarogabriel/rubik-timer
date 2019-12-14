class DB {
    users = [];

    constructor(callback){
        this.users = callback; 
    }

    bringUserByUserame(username){

        this.users.forEach( user => {
            if(user.name === username)return user;
        });
        
        return false;
    }

    insertUser(user){
        this.users[this.users.length] = user;

    }

    bringDataByJSON(fileName){
        let req = new XMLHttpRequest();
        req.open("GET", fileName, false);
        req.send(null);
        return JSON.parse(req.responseText);
    }
    

}