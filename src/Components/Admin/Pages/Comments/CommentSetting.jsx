import React, { useState, useEffect } from "react";
import { API_URLS } from "../../../../Apis/Globalapi";

const CommentSetting = () => {
  const [commentSetting, setCommentSetting] = useState("");
  const [commentApproval, setCommentApproval] = useState(false);

  useEffect(() => {
    const fetchCommentSettings = async () => {
      try {
        const response = await fetch(API_URLS.setting);
        if (!response.ok) {
          throw new Error("Failed to fetch comment settings");
        }
        const data = await response.json();
        setCommentSetting(data.commentSetting);
        setCommentApproval(data.commentApproval);
      } catch (error) {
        console.error("Error fetching comment settings:", error);
      }
    };

    fetchCommentSettings();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch(API_URLS.setting, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentSetting,
          commentApproval,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save comment settings");
      }

      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving comment settings:", error);
    }
  };

  return (
    <div className="p-6 pt-20 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Comments Setting</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Comments Setting:</label>
        <input
          type="text"
          value={commentSetting}
          onChange={(e) => setCommentSetting(e.target.value)}
          className="mt-2 p-2 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Comments Approval:</label>
        <input
          type="checkbox"
          checked={commentApproval}
          onChange={(e) => setCommentApproval(e.target.checked)}
          className="mt-2"
        />
        <span className="ml-2">Auto</span>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Settings
      </button>
    </div>
  );
};

export default CommentSetting;
