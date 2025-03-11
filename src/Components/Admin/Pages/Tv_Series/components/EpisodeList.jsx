import React from 'react';
import { BiPlay } from 'react-icons/bi';
import { BsTrash2 } from 'react-icons/bs';
import { CiLock } from 'react-icons/ci';
import { FiEdit2 } from 'react-icons/fi';

export function EpisodeList({ episodes, onEditEpisode, onDeleteEpisode, onPreviewEpisode }) {
    console.log("Epi: ", episodes)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {episodes.map(episode => (
        <div 
          key={`${episode.seasonNumber}-${episode.episodeNumber}`} 
          className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative group aspect-video">
            <img
              src={episode.thumbnail}
              alt={episode.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => onPreviewEpisode(episode)}
                className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                title="Preview Episode"
              >
                <BiPlay className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => onEditEpisode(episode)}
                className="p-2 bg-green-600 rounded-full hover:bg-green-700 transition-colors"
                title="Edit Episode"
              >
                <FiEdit2 className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => onDeleteEpisode(episode)}
                className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                title="Delete Episode"
              >
                <BsTrash2 className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-sm font-semibold text-blue-600">Season {episode.seasonNumber} Episode {episode.episodeNumber}</span>
                <h4 className="font-medium text-lg line-clamp-1">{episode.title}</h4>
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{episode.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CiLock className="w-4 h-4" />
              <span>{episode.duration}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}