const Playlist = require("../models/Playlist");
const Song = require("../models/Song");
const mongoose = require("mongoose");

module.exports = {
    create: async (req, res) => {

        let playlist = new Playlist({
            ...req.body
        });
        await playlist.save();

        res.status(200).json({
            success: true,
            message: "Playlist Created",
            Playlist: playlist
        });
    },
    update: async (req, res) => {

        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) return res.status(404).json({
            success: false,
            message: "Playlist not found"
        });
        await playlist.set(req.body)
        await playlist.save();
        res.status(200).json({
            success: true,
            Message: 'Playlist Updated',
            Playlist: playlist
        })
    },
    delete: async (req, res) => {
        const playlist = await Playlist.findById(req.params.id);
        console.log(playlist)
        if (!playlist) return res.status(404).json({
            success: false,
            message: "Playlist not found"
        });
        await playlist.remove();
        res.status(200).json({
            success: true,
            message: "Playlist Deleted",
            Playlist: playlist
        });
    },
    getAll: async (req, res) => {
        const playlists = await Playlist.find();
        res.status(200).json({
            success: true,
            PlaylistsFound: playlists.length,
            Playlists: playlists
        });
    },
    getOne: async (req, res) => {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) return res.status(404).json({
            success: false,
            message: "Playlist not found"
        });
        for (const songId of playlist.songs) {
            const song = await Song.findById(songId);
            if (!song) {
                playlist.songs.splice(playlist.songs.indexOf(songId), 1)
                await playlist.save();
            }
        }

        res.status(200).json({
            success: true,
            Playlist: playlist
        });
    },
    addSong: async (req, res) => {
        console.log(req.params.playlistId)
        const playlist = await Playlist.findById(req.params.playlistId);
        const song = await Song.findById(req.body.songId);
        if (!playlist) return res.status(404).json({
            success: false,
            message: "Playlist not found"
        });
        if (!song) return res.status(404).json({
            success: false,
            message: "Song not found"
        });
        if (playlist.songs.indexOf(req.body.songId) === -1) {
            playlist.songs.push(req.body.songId);
        } else {
            return res.status(404).json({
                success: false,
                message: "Song already added to this playlist"
            });
        }
        await playlist.save();
        res.status(200).json({
            success: true,
            Message: 'Playlist Updated, Added 1 Song',
            Playlist: playlist
        })
    },
    removeSong: async (req, res) => {
        const playlist = await Playlist.findById(req.params.playlistId);
        const song = await Song.findById(req.body.songId);

        if (!playlist) return res.status(404).json({
            success: false,
            message: "Playlist not found"
        });
        if (!song) return res.status(404).json({
            success: false,
            message: "Song not found"
        });
        if (playlist.songs.indexOf(req.body.songId) === -1) {
            return res.status(404).json({
                success: false,
                message: "Song already not added to this playlist"
            });
        }
        const index = playlist.songs.indexOf(req.body.songId);
        playlist.songs.splice(index, 1);
        await playlist.save();

        res.status(200).json({
            success: true,
            Message: 'Playlist Updated, Removed 1 Song',
            Playlist: playlist
        });
    },
    getPlaylistSongs: async (req, res) => {
        const playlist = await Playlist.findById(req.params.playlistId);
        if (!playlist) return res.status(404).json({
            success: false,
            message: "Playlist not found"
        });
        let songs = [];
        for (const songId of playlist.songs) {
            const song = await Song.findById(songId);
            songs.push(song);
            if (!song) {
                songs.pop();
            }
        }
        res.status(200).json({
            success: true,
            SongsFound: songs.length,
            PlaylistSongs: songs
        });
    }
}
