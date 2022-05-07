


class Queue{


    constructor(params) {
        super(params);
        this._sinks = new Map(); // map of active sinks/writables
        this._songs = []; // list of queued up songs
        this._currentSong = null;
        this.stream = new EventEmitter();
    }

getBitRate(song) {
    try {
        const bitRate = ffprobeSync(Path.join(process.cwd(), song)).format.bit_rate;
        return parseInt(bitRate);
    }
    catch (err) {
      
      
        return 328000; // reasonable default
    }
}

playLoop() {

    this._currentSong = this._songs.length
        ? this.removeFromQueue({ fromTop: true })
        : this._currentSong;
    const bitRate = this._getBitRate(this._currentSong);

    const songReadable = Fs.createReadStream(this._currentSong);

    const throttleTransformable = new Throttle(bitRate / 8);
    throttleTransformable.on('data', (chunk) => this._broadcastToEverySink(chunk));
    throttleTransformable.on('end', () => this._playLoop());

    this.stream.emit('play', this._currentSong);
    songReadable.pipe(throttleTransformable);
}

}

module.exports = Queue;