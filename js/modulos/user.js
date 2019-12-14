class User {
    
    username;
    password;
    times=[];

    constructor (username, password, times){
        this.username = username;
        this.password = password;
        this.times = times;   
    }
    
    getUsername (){
        return this.username;
    }
    
    getPassword(){
        return this.password;
    }

    getTimes(){
        return this.times;
    }

    setUsername(newUsername){
        this.username = newUsername;
    }

    setPassword(newPassword){
        this.username = newPassword;
    }

    setTime(newTime){
        this.times[this.times.lenght] = newTime;
    }
}
//export default User;