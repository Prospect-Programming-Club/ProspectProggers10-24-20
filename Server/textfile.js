Const = fs = require ('fs');

fs.readFile('./example.json', 'utf-8',(err, jsonString) =>{
    if (err){
        console.log(err);
    }else{
    try {
        constdata = JSON.parse(jsonString);
        console.log(jsonString);
    }   catch (err) {
        console.log('Error parsing JSON', err)
    }
}
});