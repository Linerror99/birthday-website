import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckIcon,
  XIcon,
  RotateCcwIcon,
  FileTextIcon,
  VideoIcon,
  PlayIcon } from
'lucide-react';
import { Wish } from '../../data/wishes';
interface WishAdminCardProps {
  wish: Wish;
  onApprove: (wishId: string) => void;
  onReject: (wishId: string) => void;
  onRestore: (wishId: string) => void;
  onViewVideo: (wish: Wish) => void;
}
export function WishAdminCard({
  wish,
  onApprove,
  onReject,
  onRestore,
  onViewVideo
}: WishAdminCardProps) {
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const truncateMessage = (message: string, maxLength: number = 150) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };
  const isPending = !wish.approved && !wish.rejected;
  const isApproved = wish.approved;
  const isRejected = wish.rejected;
  return (
    <motion.div
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
        scale: 0.9
      }}
      className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-6 hover:shadow-lg transition-shadow">

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center text-white font-bold text-lg">
            {wish.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{wish.name}</h3>
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
        <div className="flex items-center gap-2">
          {wish.type === 'text' ?
          <FileTextIcon className="w-5 h-5 text-gray-400" /> :

          <VideoIcon className="w-5 h-5 text-gray-400" />
          }
        </div>
      </div>

      {/* Content Preview */}
      <div className="mb-4">
        {wish.type === 'text' ?
        <p className="text-gray-700 italic">
            "{truncateMessage(wish.message)}"
          </p> :

        <div className="space-y-2">
            {wish.message &&
          <p className="text-gray-700 text-sm italic">
                "{truncateMessage(wish.message, 100)}"
              </p>
          }
            {wish.videoUrl &&
          <button
            onClick={() => onViewVideo(wish)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium">

                <PlayIcon className="w-4 h-4" />
                Voir la vidéo
              </button>
          }
          </div>
        }
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {isPending &&
        <>
            <motion.button
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}
            onClick={() => onApprove(wish.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors">

              <CheckIcon className="w-4 h-4" />
              Approuver
            </motion.button>
            <motion.button
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}
            onClick={() => setShowRejectConfirm(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors">

              <XIcon className="w-4 h-4" />
              Rejeter
            </motion.button>
          </>
        }

        {isApproved &&
        <motion.button
          whileHover={{
            scale: 1.02
          }}
          whileTap={{
            scale: 0.98
          }}
          onClick={() => onRestore(wish.id)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors">

            <RotateCcwIcon className="w-4 h-4" />
            Annuler l'approbation
          </motion.button>
        }

        {isRejected &&
        <motion.button
          whileHover={{
            scale: 1.02
          }}
          whileTap={{
            scale: 0.98
          }}
          onClick={() => onRestore(wish.id)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors">

            <RotateCcwIcon className="w-4 h-4" />
            Restaurer
          </motion.button>
        }
      </div>

      {/* Reject Confirmation Modal */}
      <AnimatePresence>
        {showRejectConfirm &&
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
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowRejectConfirm(false)}>

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
            className="bg-white rounded-2xl p-6 max-w-md w-full">

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Rejeter ce vœu ?
              </h3>
              <p className="text-gray-600 mb-6">
                Es-tu sûr de vouloir rejeter ce vœu de {wish.name} ? Cette
                action peut être annulée plus tard.
              </p>
              <div className="flex gap-3">
                <button
                onClick={() => setShowRejectConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors">

                  Annuler
                </button>
                <button
                onClick={() => {
                  onReject(wish.id);
                  setShowRejectConfirm(false);
                }}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors">

                  Rejeter
                </button>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </motion.div>);

}