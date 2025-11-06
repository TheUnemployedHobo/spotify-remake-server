import { relations } from "drizzle-orm"

import { artists } from "./schema/artist.schema.js"
import { favorites } from "./schema/favorite.schema.js"
import { genres } from "./schema/genre.schema.js"
import { playlistInfo, playlists } from "./schema/playlists.schema.js"
import { songs } from "./schema/song.schema.js"
import { users } from "./schema/user.schema.js"

export const songsRelations = relations(songs, ({ one }) => ({
  artist: one(artists, {
    fields: [songs.artist_id],
    references: [artists.id],
  }),
}))

export const artistsRelations = relations(artists, ({ many, one }) => ({
  genre: one(genres, {
    fields: [artists.genre_id],
    references: [genres.id],
  }),
  songs: many(songs),
}))

export const playlistInfoRelations = relations(playlistInfo, ({ many }) => ({
  songs: many(playlists),
}))

export const playlistsRelations = relations(playlists, ({ one }) => ({
  playlist: one(playlistInfo, {
    fields: [playlists.pli_id],
    references: [playlistInfo.id],
  }),
  song: one(songs, {
    fields: [playlists.song_id],
    references: [songs.id],
  }),
}))

export const favoritesRelations = relations(favorites, ({ one }) => ({
  song: one(songs, {
    fields: [favorites.song_id],
    references: [songs.id],
  }),
}))

export const usersRelations = relations(users, ({ many }) => ({
  favorites: many(favorites),
  playlists: many(playlistInfo),
}))
