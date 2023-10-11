const { MongoClient } = require ("mongodb");

const TheUrl = "mongodb+srv://anshedusman:sDpD2pJA08hlJHVD@cluster0.fqnu0pt.mongodb.net/?retryWrites=true&w=majority";

const Client = new MongoClient(TheUrl);

const DataName = "gettingStarted"

async function Red(){
    try{
        await Client.connect();
        const DB = Client.db(DataName);

        const Call = DB.collection("people");

        let PeopleDocu =[
            {
                name    : {"first" : "Nikola", "last" : "tesla"},
                birth   : new Date (1856, 7, 10 ), //yyyy/mm/dd
                death   : new Date (1943, 1, 7),
                contribs: ["Remote Control" , "Wireless Transmission" , "X-rays"],
                views   : 3690000                 //it just a random num
    
            },
    
            {
                name    : {"first" : "Albert" , "last" : "Einstein"},
                birth   : new Date (1879 , 3 , 14), //yyyy/mm/dd
                death   : new Date (1955 , 4 , 18),
                contribs: ["Quantum Theory of Light" , "General Theory of Relativity" , "Avogadro's Number"],
                views   : 3330000                  // it just a random num
            },
            {
                name    : {"first" : "Isaac" , "last" : "Newton"},
                birth   : new Date (1643 , 1 , 4), //yyyy/mm/dd
                death   : new Date (1727 , 3 ,31),
                contribs: ["Laws of Motion" , "Color Spectrum" , "Law of Universal Grvitaion"],
                views   : 7430000                 // it just a random num
            }
        ];

        const filter = {"name.first": "Isaa","name.last" : "New"};

        const U = await Call.updateMany(filter , {$set : {"name.first" : "Isaac" , "name.last":"Newton"}}).then(async() => {
            const Document = await Call.findOne({"name.first" : "Isaac" , "name.last" : "Newton"});             //Actually we can change any Multidata from the object;
            
            console.log("Hmmm Finaly got it: \n" + JSON.stringify(Document))
        })
    }
    catch(err){
        console.log(err.stack);
    }
    finally {
        await Client.close();
    }
};
Red().catch(console.dir);