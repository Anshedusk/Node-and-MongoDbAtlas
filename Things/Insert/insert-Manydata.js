const { MongoClient } = require ("mongodb");

const TheUrl = "mongodb+srv://anshedusman:sDpD2pJA08hlJHVD@cluster0.fqnu0pt.mongodb.net/?retryWrites=true&w=majority"

const Client = new MongoClient(TheUrl);

const DataName = "gettingStarted"; //Database name

async function Start(){

    try {

        await Client.connect();
        const DB = Client.db(DataName);

        const Call = DB.collection("people"); // "people" is my Database collection name

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

        const filter   = {"name.last" : "Einstein"}; //filtering what we want to show

        const N = await Call.insertMany(PeopleDocu);
        const Document = await Call.findOne(filter);

        console.log("Ohh yeah found it: \n" + JSON.stringify(Document));
    }

     catch (err){
        console.log(err.stack)
    }

    finally {
        await Client.close();
    }

};

Start().catch(console.dir);