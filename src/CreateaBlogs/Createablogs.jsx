import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { FaBold, FaItalic } from "react-icons/fa";
import { TfiAlignLeft, TfiAlignCenter, TfiAlignRight } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { http } from "../config/Axios";

const Createablog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const contentRef = useRef(null);
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [cancelled, setCancelled] = useState(new Set());
  const [showAllTags, setShowAllTags] = useState(false);
  const [contentError, setContentError] = useState("");

  const allTags = [
    "Anxiety",
    "Depression",
    "Loneliness",
    "Grief",
    "PTSD",
    "BPD",
    "Substance Abuse",
    "Eating Disorder",
  ];
  const topTags = allTags.slice(0, 3);

  const handleTagInsert = (tag) => {
    const contentEl = contentRef.current;
    const existingText = contentEl.innerText;

    if (existingText.includes(`#${tag}`)) {
      toast.info(`#${tag} is already added.`);
      return;
    }

    if (!tags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
    }

    contentEl.focus();

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const tagNode = document.createElement("span");
    tagNode.textContent = `#${tag} `;
    tagNode.style.color = "blue";
    range.insertNode(tagNode);

    range.setStartAfter(tagNode);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const formatText = (command) => {
    contentRef.current.focus();
    document.execCommand(command);
  };

  const onDrop = useCallback((files) => {
    const withPreview = files.map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
      raw: file, // store original file for API
    }));
    setImages((prev) => [...prev, ...withPreview]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const removeImage = (file) => {
    URL.revokeObjectURL(file.preview);
    setCancelled((prev) => new Set([...prev, file]));
    setImages((prev) => prev.filter((img) => img !== file));
  };

  const onSubmit = (formData) => {
    const contentText = contentRef.current?.innerText.trim();
    if (!contentText) {
      setContentError("Content is required.");
      return;
    } else {
      setContentError("");
    }

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("content", contentRef.current.innerHTML);

    // Append tags as JSON string
    payload.append("tags", JSON.stringify(tags));

    // Append images
    images
      .filter((img) => !cancelled.has(img))
      .forEach((img) => payload.append("images", img.raw));

    sendToApi(payload);
  };

  const sendToApi = async (data) => {
    try {
      const res = await http.post("/post", data);

      if (res.status === 200 || res.status === 201) {
        toast.success("Blog posted successfully!");
        setTimeout(() => navigate("/blogs"), 1500);
      } else {
        console.error("Unexpected response:", res);
        toast.error("Failed to post blog. Try again.");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      if (err.response?.data?.message) {
        toast.error(`Error: ${err.response.data.message}`);
      } else {
        toast.error("Failed to post blog. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#bcccdc] flex justify-center items-center p-4 mt-[56px]">
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl bg-white p-6 rounded-lg shadow"
      >
        <label className="block mb-2 font-semibold">Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Blog title"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}

        <label className="block mt-4 mb-2 font-semibold">
          Upload Images (Optional)
        </label>
        <div
          {...getRootProps()}
          className={`p-4 border-2 border-dashed rounded cursor-pointer text-center ${
            isDragActive ? "bg-blue-100" : "bg-gray-50"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive
            ? "Drop images here..."
            : "Drag & drop or click to select images"}
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mt-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={img.preview}
                  alt={`Preview ${idx}`}
                  className="h-20 w-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(img)}
                  className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <label className="block mt-4 mb-2 font-semibold">Content</label>
        <div
          ref={contentRef}
          contentEditable
          className="h-40 p-2 border border-gray-300 rounded bg-white overflow-auto"
          spellCheck={false}
        />
        {contentError && <p className="text-sm text-red-500">{contentError}</p>}

        <div className="flex gap-3 text-lg mt-2 mb-4">
          <button
            className="hover:cursor-pointer"
            type="button"
            onClick={() => formatText("bold")}
          >
            <FaBold />
          </button>
          <button
            className="hover:cursor-pointer"
            type="button"
            onClick={() => formatText("italic")}
          >
            <FaItalic />
          </button>
          <button
            className="hover:cursor-pointer"
            type="button"
            onClick={() => formatText("justifyLeft")}
          >
            <TfiAlignLeft />
          </button>
          <button
            className="hover:cursor-pointer"
            type="button"
            onClick={() => formatText("justifyCenter")}
          >
            <TfiAlignCenter />
          </button>
          <button
            className="hover:cursor-pointer"
            type="button"
            onClick={() => formatText("justifyRight")}
          >
            <TfiAlignRight />
          </button>
        </div>

        <label className="block font-semibold mb-2">Tags</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {topTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`px-4 py-1 rounded-full ${
                tags.includes(tag)
                  ? "bg-amber-300"
                  : "bg-yellow-300 hover:bg-amber-200"
              }`}
              onClick={() => handleTagInsert(tag)}
            >
              {tag}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowAllTags(true)}
            className="bg-yellow-300 px-3 py-1 rounded-full hover:bg-amber-200"
          >
            + Tags
          </button>
        </div>

        {showAllTags && (
          <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <h3 className="text-lg font-bold mb-4">Select Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagInsert(tag)}
                    className={`px-4 py-1 rounded-full ${
                      tags.includes(tag)
                        ? "bg-amber-300"
                        : "bg-yellow-300 hover:bg-amber-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowAllTags(false)}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Done
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default Createablog;
