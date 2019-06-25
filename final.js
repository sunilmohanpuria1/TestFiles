const client=require('./rediscon');                    //required redis connection from rediscon.js
const {sequelize,my_table}=require('./sequConnect');   //required sequelize connection and model of my_table
const fs=require('fs');
const path = "./output.log";


function checkFile(path)
{
    if (fs.existsSync(path))
        {
        console.log('Output.log exists');return 1;
        }
        console.log('Output.log does not exists');
    return 0;
}


function writeInFile(path,data)
{
    fs.appendFile(path,data, (err) => {  
        if (err) throw err;
    });   
}


function main(path)
{   
    let flag=checkFile(path);
    if(flag)
    {    
        let now = new Date();
        writeInFile(path,"\nScript execution started at "+now);
    }

    else{
        fs.openSync(path, 'w');
        let now = new Date();
        writeInFile(path,"\nScript execution started at "+now);
    }

    sequelize.query("TRUNCATE `my_database`.`my_tables`", {});

    client.keys('*', function (err, keys) 
    {
        if (err) return console.log(err);
        for(let i = 0, len = keys.length; i < len; i++) {  
            sequelize.sync().then(function (){
                my_table.create({ ID:i+1,Redis_key: keys[i]}).then(temp => {
                    console.log("Inserted Key", temp.Redis_key);
                    });
               });
            }
    }); 
        
    let now = new Date();
    writeInFile(path,"\nScript execution finished at "+now);

}


main(path);
