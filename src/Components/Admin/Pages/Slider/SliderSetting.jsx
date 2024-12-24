import React, { useState } from 'react';
import { API_URLS } from '../../../../Apis/Globalapi';

const SliderSetting = () => {
  const [sliderType, setSliderType] = useState('Latest Movie/Series');
  const [totalContent, setTotalContent] = useState(5);

  const handleSaveSetting = async () => {
    try {
      const response = await fetch(API_URLS.slidersetting, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sliderType, totalContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }
      alert('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <div className="pt-20 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Slider Setting</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Slider Type</label>
        <select
          value={sliderType}
          onChange={(e) => setSliderType(e.target.value)}
          className="border p-2 w-full mt-1 rounded"
        >
          <option value="Latest Movie/Series">Latest Movie/Series</option>
          <option value="Image Slider">Image Slider</option>
          <option value="Latest TV Channel">Latest TV Channel</option>
          <option value="Disable">Disable</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Total Content</label>
        <input
          type="number"
          value={totalContent}
          onChange={(e) => setTotalContent(e.target.value)}
          className="border p-2 w-full mt-1 rounded"
        />
      </div>

      <button
        onClick={handleSaveSetting}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Setting
      </button>
    </div>
  );
};

export default SliderSetting;
