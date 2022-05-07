var XLSX = require('xlsx');

const LS = require('../../../models/ListenedSong');
const song = require('../../../models/Song');

module.exports = {
    generate: async () => {
        var wb = XLSX.utils.book_new();
    
        try {
            const data = await LS.find({}).select({ _id: 0, user_id: 1, song_id: 1, listen_count: 1 })
    
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var down = 'public/triplets_file.csv'
            XLSX.utils.book_append_sheet(wb, ws, "sheet1");
            XLSX.writeFile(wb, down);
     
            
        } catch (error) {
            console.log(error.message)
        }
    
    },

    generateMusic: async () => {
        var wb = XLSX.utils.book_new();
    
        try {
            //to change artist name by id
            const data = await song.find({}).select({ _id: 0, song_id: 1, title: 1, release: 1, artist_name: 1 })
    
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var down = 'public/song_data.csv'
            XLSX.utils.book_append_sheet(wb, ws, "sheet1");
            XLSX.writeFile(wb, down);
     
            
        } catch (error) {
            console.log(error.message)
        }
    
    }
}