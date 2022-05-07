const express = require('express');
const router = express.Router();
const Playlist = require('../../../models/Playlist')
const mongoose = require("mongoose");
const Song = require('../../../models/Song');

// // Add playlist
// router.post("/post", async (req, res) => {
//
//     let playlist = new Playlist({
//         ...req.body
//     });
//     await playlist.save();
//
//     res.status(200).json({
//         message: "Playlist Created",
//         Playlist : playlist
//     });
// });
//
// // Update playlist by id
// router.put("/update/:id", async (req, res) => {
//
//     const playlist = await Playlist.findById(req.params.id);
//     if (!playlist) return res.status(404).json({
//         message: "Playlist not found"
//     });
//     await playlist.set(req.body)
//     await playlist.save();
//     res.status(200).json({
//         Message: 'Playlist Updated',
//         Playlist: playlist
//     })
// });
// // Add song to a playlist
// router.put("/add-song/:playlistId", async (req, res) => {
//
//     const playlist = await Playlist.findById(req.params.id);
//     if (!playlist) return res.status(404).json({
//         message: "Playlist not found"
//     });
//     console.log(playlist)
//     if (playlist.songs.indexOf(req.body.songId) === -1) {
//         playlist.songs.push(req.body.songId);
//     }
//     await playlist.save();
//     res.status(200).json({
//         Message: 'Playlist Updated, Added 1 Song',
//         Playlist: playlist
//     })});
//
// // Delete song from playlist
// router.put("/delete-song/:playlistId", async (req, res) => {
//     const playlist = await Playlist.findById(req.params.playlistId);
//     if (!playlist) return res.status(404).json({
//         message: "Playlist not found"
//     });
//
//     const index = playlist.songs.indexOf(req.body.songId);
//     playlist.songs.splice(index, 1);
//     await playlist.save();
//
//     res.status(200).json({
//         Message: 'Playlist Updated, Removed 1 Song',
//         Playlist: playlist
//     });
// });
//
// //Get playlist by id
// router.get("/get/:id", async (req, res) => {
//     const playlist = await Playlist.findById(req.params.id);
//     if (!playlist) return res.status(404).json({
//         message: "Playlist not found"
//     });
//     const songs = await Song.find({ _id: playlist.songs });
//     res.status(200).json({
//         data: { playlist, songs }
//     });
// });
//
// // Get all playlists
// router.get("/get-all", async (req, res) => {
//     const playlists = await Playlist.find();
//     res.status(200).json({
//         PlaylistsCount : playlists.length,
//         Playlists: playlists
//     });
// });
//
// // Delete playlist by id
// // Need to remove playlist from user playlists
// router.delete("/delete/:id", async (req, res) => {
//     const playlist = await Playlist.findById(req.params.id);
//     console.log(playlist)
//     if (!playlist) return res.status(404).json({
//         message: "Playlist not found"
//     });
//     await playlist.remove();
//     res.status(200).json({
//         message: "Playlist Deleted",
//         Playlist : playlist
//     });
// });
module.exports = router;
