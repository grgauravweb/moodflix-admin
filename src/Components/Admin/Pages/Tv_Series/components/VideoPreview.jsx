import React from 'react';
import { BsClock } from 'react-icons/bs';
import { FiX } from 'react-icons/fi';
import ReactPlayer from 'react-player';

export function VideoPreview({ episode, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold">
            S{episode.seasonNumber} E{episode.episodeNumber}: {episode.title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={episode.video}
            width="100%"
            height="100%"
            controls
            playing
            className="absolute top-0 left-0"
          />
        </div>
        <div className="p-4">
          <p className="text-gray-600">{episode.description}</p>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <BsClock className="w-4 h-4" />
            <span>{episode.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}