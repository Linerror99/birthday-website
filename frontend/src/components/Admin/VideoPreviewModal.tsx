import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, CheckIcon, XCircleIcon } from 'lucide-react';
import { Wish } from '../../data/wishes';
interface VideoPreviewModalProps {
  wish: Wish | null;
  onClose: () => void;
  onApprove: (wishId: string) => void;
  onReject: (wishId: string) => void;
}
export function VideoPreviewModal({
  wish,
  onClose,
  onApprove,
  onReject
}: VideoPreviewModalProps) {
  if (!wish) return null;
  const isPending = !wish.approved && !wish.rejected;
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        exit={{
          opacity: 0
        }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        onClick={onClose}>

        <motion.div
          initial={{
            scale: 0.9,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          exit={{
            scale: 0.9,
            opacity: 0
          }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center text-white font-bold text-lg">
                {wish.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{wish.name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(wish.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">

              <XIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Message */}
          {wish.message &&
          <p className="text-gray-700 mb-4 italic">"{wish.message}"</p>
          }

          {/* Video Player */}
          {wish.videoUrl &&
          <div className="mb-6 rounded-xl overflow-hidden bg-black">
              <video
              src={wish.videoUrl}
              controls
              className="w-full max-h-[60vh]"
              autoPlay />

            </div>
          }

          {/* Actions */}
          {isPending &&
          <div className="flex gap-3">
              <motion.button
              whileHover={{
                scale: 1.02
              }}
              whileTap={{
                scale: 0.98
              }}
              onClick={() => {
                onApprove(wish.id);
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors">

                <CheckIcon className="w-5 h-5" />
                Approuver
              </motion.button>
              <motion.button
              whileHover={{
                scale: 1.02
              }}
              whileTap={{
                scale: 0.98
              }}
              onClick={() => {
                onReject(wish.id);
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors">

                <XCircleIcon className="w-5 h-5" />
                Rejeter
              </motion.button>
            </div>
          }
        </motion.div>
      </motion.div>
    </AnimatePresence>);

}