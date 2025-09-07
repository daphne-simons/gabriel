'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface Contributor {
  _id: string;
  name: string;
  email: string;
}

interface UploadedFile {
  file: File;
  preview: string;
  caption?: string;
  credit?: string;
  altText?: string;
}

export function DropPortal() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [contributor, setContributor] = useState<Contributor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setError('Invalid or missing token');
      setLoading(false);
      return;
    }

    validateToken();
  }, [token]);

  const validateToken = async () => {
    try {
      const response = await fetch('/api/validate-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });

      if (!response.ok) {
        throw new Error('Invalid or expired token');
      }

      const data = await response.json();
      setContributor(data.contributor);
    } catch (err) {
      setError('Invalid or expired magic link');
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : '/file-icon.svg', // You'll need a generic file icon
      caption: '',
      credit: '',
      altText: ''
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi', '.webm'],
      'audio/*': ['.mp3', '.wav', '.aac', '.ogg'],
      'text/*': ['.txt', '.md', '.pdf'],
      'application/pdf': ['.pdf']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: true
  });

  const updateFileMetadata = (index: number, field: keyof UploadedFile, value: string) => {
    setUploadedFiles(prev => prev.map((file, i) =>
      i === index ? { ...file, [field]: value } : file
    ));
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) return;

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('token', token!);

      uploadedFiles.forEach((uploadedFile, index) => {
        formData.append(`files`, uploadedFile.file);
        formData.append(`captions`, uploadedFile.caption || '');
        formData.append(`credits`, uploadedFile.credit || '');
        formData.append(`altTexts`, uploadedFile.altText || '');
      });

      const response = await fetch('/api/submit-drop', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      setSubmitted(true);
      // Clean up preview URLs
      uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
      setUploadedFiles([]);

    } catch (err) {
      setError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🌙</div>
          <h1 className="text-2xl mb-2">Portal Closed</h1>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">✨</div>
          <h1 className="text-2xl mb-2">Constellation Updated</h1>
          <p className="text-gray-400">
            Thank you {contributor?.name}. Your contribution has joined the constellation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-roboto container mx-auto px-4 py-8 max-w-4xl flex flex-col">
      <div className="text-center mb-8">
        <div className="mb-4 flex justify-center"><Image width={250} height={250} src="/search-world.webp" alt="Global Search Gif" /></div>
        <h1 className="text-3xl mb-2">Constellation Portal</h1>
        <p className="text-gray-400">
          Welcome {contributor?.name}. Drop your materials into the constellation.
        </p>
      </div>

      {
        uploadedFiles.length === 0 ? (
          <div
            {...getRootProps()}
            className={`
            border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
            ${isDragActive
                ? 'border-white bg-white bg-opacity-5'
                : 'border-gray-600 hover:border-gray-400'
              }
          `}
          >
            <input {...getInputProps()} />
            <div className="text-4xl mb-4">📁</div>
            <p className="text-xl mb-2">
              {isDragActive ? 'Drop your file here...' : 'Drag & drop your file here'}
            </p>
            <p className="text-gray-400">
              Or click to select file • Image, video, audio, document • Max 50MB
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4">
              {uploadedFiles.map((uploadedFile, index) => (
                <div key={index} className="border border-gray-700 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    {uploadedFile.file.type.startsWith('image/') ? (
                      <Image
                        width={80}
                        height={80}
                        src={uploadedFile.preview}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-800 rounded flex items-center justify-center text-2xl">
                        📄
                      </div>
                    )}

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{uploadedFile.file.name}</span>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-white"
                        >
                          ✕
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Caption (optional)"
                        value={uploadedFile.caption}
                        onChange={(e) => updateFileMetadata(index, 'caption', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400"
                      />

                      <input
                        type="text"
                        placeholder="Credit (optional)"
                        value={uploadedFile.credit}
                        onChange={(e) => updateFileMetadata(index, 'credit', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400"
                      />

                      {uploadedFile.file.type.startsWith('image/') && (
                        <input
                          type="text"
                          placeholder="Alt text for accessibility"
                          value={uploadedFile.altText}
                          onChange={(e) => updateFileMetadata(index, 'altText', e.target.value)}
                          className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              {/* STRETCH : Multiple File upload */}
              {/* <div
                {...getRootProps()}
                className="flex-1 border border-dashed border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400"
              >
                <input {...getInputProps()} />
                <span className="text-gray-400">+ Add more files</span>
              </div> */}

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit to Constellation'}
              </button>
            </div>
          </div>
        )
      }
    </div >
  );
}