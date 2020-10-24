Const = fs = require ('fs');

fs.readFile('./example.jason', 'utf-8',(err, jsonString) =>{
    if (err){
        Console.log(err);
    }else{
    try {
        constdata = JSON.parse(jsonString);
        console.log(jsonString);
    }   catch (err) {
        console.log('Error parsing JSON', err)
    }
}
});