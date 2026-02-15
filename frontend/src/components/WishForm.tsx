import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadIcon,
  CheckCircleIcon,
  XCircleIcon,
  Loader2Icon,
  FileTextIcon,
  VideoIcon } from
'lucide-react';
import { submitWish, SubmitWishResponse } from '../api/wishesApi';
type FormStatus = 'idle' | 'uploading' | 'success' | 'error';
export function WishForm() {
  const [name, setName] = useState('');
  const [type, setType] = useState<'text' | 'video'>('text');
  const [message, setMessage] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [response, setResponse] = useState<SubmitWishResponse | null>(null);
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxMessageLength = type === 'video' ? 200 : 500;
  const maxVideoSize = 100 * 1024 * 1024; // 100 MB
  const validateForm = (): boolean => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (!name.trim()) {
      newErrors.name = 'Le prénom est requis';
    } else if (name.length > 50) {
      newErrors.name = 'Le prénom ne peut pas dépasser 50 caractères';
    }
    if (type === 'text' && !message.trim()) {
      newErrors.message = 'Le message est requis';
    }
    if (type === 'video' && !videoFile) {
      newErrors.video = 'Veuillez sélectionner une vidéo';
    }
    if (videoFile && videoFile.size > maxVideoSize) {
      newErrors.video = 'La vidéo ne peut pas dépasser 100 MB';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('video/')) {
        setErrors({
          ...errors,
          video: 'Veuillez sélectionner un fichier vidéo valide'
        });
        return;
      }
      // Validate file size
      if (file.size > maxVideoSize) {
        setErrors({
          ...errors,
          video: 'La vidéo ne peut pas dépasser 100 MB'
        });
        return;
      }
      setVideoFile(file);
      setErrors({
        ...errors,
        video: ''
      });
      // Create preview URL
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      const input = fileInputRef.current;
      if (input) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;
        handleVideoChange({
          target: input
        } as any);
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setStatus('uploading');
    setResponse(null);
    try {
      const result = await submitWish({
        name: name.trim(),
        type,
        message: message.trim(),
        videoFile: videoFile || undefined
      });
      setResponse(result);
      if (result.success) {
        setStatus('success');
        // Reset form after 3 seconds
        setTimeout(() => {
          resetForm();
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
      setResponse({
        success: false,
        message: 'Une erreur inattendue est survenue',
        error: 'UNKNOWN_ERROR'
      });
    }
  };
  const resetForm = () => {
    setName('');
    setMessage('');
    setVideoFile(null);
    setVideoPreview(null);
    setStatus('idle');
    setResponse(null);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {status === 'success' ?
        <motion.div
          key="success"
          initial={{
            opacity: 0,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          exit={{
            opacity: 0,
            scale: 0.9
          }}
          className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-200 text-center">

            <motion.div
            initial={{
              scale: 0
            }}
            animate={{
              scale: 1
            }}
            transition={{
              delay: 0.2,
              type: 'spring'
            }}>

              <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold text-green-700 mb-2">
              Merci {name} !
            </h3>
            <p className="text-green-600">
              Ton message a été envoyé avec succès !
            </p>
          </motion.div> :

        <motion.form
          key="form"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -20
          }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 border-2 border-amber-200">

            {/* Name Field */}
            <div className="mb-6">
              <label
              htmlFor="name"
              className="block text-sm font-semibold text-amber-900 mb-2">

                Ton prénom <span className="text-rose-500">*</span>
              </label>
              <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              disabled={status === 'uploading'}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${errors.name ? 'border-red-300 focus:border-red-500' : 'border-amber-200 focus:border-amber-400'} focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed`}
              placeholder="Entre ton prénom" />

              {errors.name &&
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            }
            </div>

            {/* Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-amber-900 mb-3">
                Type de vœu <span className="text-rose-500">*</span>
              </label>
              <div className="flex gap-4">
                <button
                type="button"
                onClick={() => setType('text')}
                disabled={status === 'uploading'}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${type === 'text' ? 'border-amber-400 bg-amber-50' : 'border-amber-200 hover:border-amber-300'} disabled:opacity-50 disabled:cursor-not-allowed`}>

                  <FileTextIcon className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                  <span className="font-semibold text-amber-900">
                    Message écrit
                  </span>
                </button>
                <button
                type="button"
                onClick={() => setType('video')}
                disabled={status === 'uploading'}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${type === 'video' ? 'border-amber-400 bg-amber-50' : 'border-amber-200 hover:border-amber-300'} disabled:opacity-50 disabled:cursor-not-allowed`}>

                  <VideoIcon className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                  <span className="font-semibold text-amber-900">Vidéo</span>
                </button>
              </div>
            </div>

            {/* Conditional Content */}
            {type === 'text' ?
          <div className="mb-6">
                <label
              htmlFor="message"
              className="block text-sm font-semibold text-amber-900 mb-2">

                  Ton message <span className="text-rose-500">*</span>
                </label>
                <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={maxMessageLength}
              rows={6}
              disabled={status === 'uploading'}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-colors resize-none ${errors.message ? 'border-red-300 focus:border-red-500' : 'border-amber-200 focus:border-amber-400'} focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed`}
              placeholder="Écris ton message d'anniversaire..." />

                <div className="flex justify-between items-center mt-2">
                  {errors.message &&
              <p className="text-red-500 text-sm">{errors.message}</p>
              }
                  <p
                className={`text-sm ml-auto ${message.length > maxMessageLength * 0.9 ? 'text-rose-500' : 'text-amber-600'}`}>

                    {message.length} / {maxMessageLength}
                  </p>
                </div>
              </div> :

          <div className="mb-6">
                <label className="block text-sm font-semibold text-amber-900 mb-2">
                  Ta vidéo <span className="text-rose-500">*</span>
                </label>

                {!videoPreview ?
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${errors.video ? 'border-red-300 hover:border-red-400' : 'border-amber-300 hover:border-amber-400'} bg-amber-50/50 hover:bg-amber-50`}>

                    <UploadIcon className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                    <p className="text-amber-900 font-medium mb-1">
                      Clique pour sélectionner ou glisse ta vidéo ici
                    </p>
                    <p className="text-sm text-amber-600">
                      Formats acceptés: MP4, MOV, AVI (max 100 MB)
                    </p>
                  </div> :

            <div className="relative">
                    <video
                src={videoPreview}
                controls
                className="w-full rounded-xl" />

                    <button
                type="button"
                onClick={() => {
                  setVideoFile(null);
                  setVideoPreview(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors">

                      ×
                    </button>
                  </div>
            }

                <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/quicktime,video/x-msvideo"
              onChange={handleVideoChange}
              className="hidden" />


                {errors.video &&
            <p className="text-red-500 text-sm mt-2">{errors.video}</p>
            }

                {/* Optional message for video */}
                <div className="mt-4">
                  <label
                htmlFor="video-message"
                className="block text-sm font-medium text-amber-700 mb-2">

                    Message accompagnant la vidéo (optionnel)
                  </label>
                  <textarea
                id="video-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={maxMessageLength}
                rows={3}
                disabled={status === 'uploading'}
                className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-400 focus:outline-none resize-none disabled:bg-gray-100"
                placeholder="Ajoute un petit message..." />

                  <p className="text-sm text-amber-600 mt-1">
                    {message.length} / {maxMessageLength}
                  </p>
                </div>
              </div>
          }

            {/* Error Message */}
            {status === 'error' && response &&
          <motion.div
            initial={{
              opacity: 0,
              y: -10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">

                <XCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700">{response.message}</p>
              </motion.div>
          }

            {/* Submit Button */}
            <button
            type="submit"
            disabled={status === 'uploading'}
            className="w-full py-4 bg-gradient-to-r from-amber-500 via-rose-500 to-teal-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">

              {status === 'uploading' ?
            <>
                  <Loader2Icon className="w-5 h-5 animate-spin" />
                  Envoi en cours...
                </> :

            <>Envoyer mon vœu</>
            }
            </button>
          </motion.form>
        }
      </AnimatePresence>
    </div>);

}