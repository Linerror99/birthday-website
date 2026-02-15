import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  LockIcon,
  Loader2Icon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  BarChart3Icon } from
'lucide-react';
import { WishAdminCard } from '../components/Admin/WishAdminCard';
import { VideoPreviewModal } from '../components/Admin/VideoPreviewModal';
import {
  getAllWishes,
  approveWish,
  rejectWish,
  restoreWish } from
'../api/wishesApi';
import { Wish } from '../data/wishes';
type TabType = 'pending' | 'approved' | 'rejected';
export function AdminDashboard() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [selectedVideo, setSelectedVideo] = useState<Wish | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  useEffect(() => {
    loadWishes();
  }, []);
  const loadWishes = async () => {
    try {
      const allWishes = await getAllWishes();
      setWishes(allWishes);
    } catch (error) {
      console.error('Error loading wishes:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleApprove = async (wishId: string) => {
    setActionLoading(wishId);
    try {
      await approveWish(wishId);
      await loadWishes();
      // Show toast (you can add a toast library here)
    } catch (error) {
      console.error('Error approving wish:', error);
    } finally {
      setActionLoading(null);
    }
  };
  const handleReject = async (wishId: string) => {
    setActionLoading(wishId);
    try {
      await rejectWish(wishId);
      await loadWishes();
      // Show toast
    } catch (error) {
      console.error('Error rejecting wish:', error);
    } finally {
      setActionLoading(null);
    }
  };
  const handleRestore = async (wishId: string) => {
    setActionLoading(wishId);
    try {
      await restoreWish(wishId);
      await loadWishes();
      // Show toast
    } catch (error) {
      console.error('Error restoring wish:', error);
    } finally {
      setActionLoading(null);
    }
  };
  const pendingWishes = wishes.filter((w) => !w.approved && !w.rejected);
  const approvedWishes = wishes.filter((w) => w.approved);
  const rejectedWishes = wishes.filter((w) => w.rejected);
  const currentWishes = {
    pending: pendingWishes,
    approved: approvedWishes,
    rejected: rejectedWishes
  }[activeTab];
  const tabs = [
  {
    id: 'pending' as TabType,
    label: 'En attente',
    count: pendingWishes.length,
    icon: ClockIcon,
    color: 'amber'
  },
  {
    id: 'approved' as TabType,
    label: 'Approuvés',
    count: approvedWishes.length,
    icon: CheckCircleIcon,
    color: 'green'
  },
  {
    id: 'rejected' as TabType,
    label: 'Rejetés',
    count: rejectedWishes.length,
    icon: XCircleIcon,
    color: 'red'
  }];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Warning Banner */}
      <div className="bg-amber-500 text-white py-3 px-4 flex items-center justify-center gap-2">
        <LockIcon className="w-5 h-5" />
        <span className="font-semibold">
          Zone Admin - Vœux en attente de validation
        </span>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard Admin
              </h1>
              <p className="text-gray-600 mt-1">
                Gestion des vœux d'anniversaire
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <BarChart3Icon className="w-4 h-4" />
                  <span>Total</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {wishes.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-4 font-semibold transition-colors ${isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>

                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold ${tab.color === 'amber' ? 'bg-amber-100 text-amber-700' : tab.color === 'green' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>

                      {tab.count}
                    </span>
                  </div>
                  {isActive &&
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />

                  }
                </button>);

            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ?
        <div className="flex flex-col items-center justify-center py-20">
            <Loader2Icon className="w-12 h-12 text-gray-400 animate-spin mb-4" />
            <p className="text-gray-600">Chargement des vœux...</p>
          </div> :
        currentWishes.length === 0 ?
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          className="text-center py-20">

            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              {activeTab === 'pending' &&
            <ClockIcon className="w-10 h-10 text-gray-400" />
            }
              {activeTab === 'approved' &&
            <CheckCircleIcon className="w-10 h-10 text-gray-400" />
            }
              {activeTab === 'rejected' &&
            <XCircleIcon className="w-10 h-10 text-gray-400" />
            }
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {activeTab === 'pending' && 'Aucun vœu en attente'}
              {activeTab === 'approved' && 'Aucun vœu approuvé'}
              {activeTab === 'rejected' && 'Aucun vœu rejeté'}
            </h3>
            <p className="text-gray-600">
              {activeTab === 'pending' && 'Les nouveaux vœux apparaîtront ici'}
              {activeTab === 'approved' &&
            'Les vœux approuvés apparaîtront ici'}
              {activeTab === 'rejected' && 'Les vœux rejetés apparaîtront ici'}
            </p>
          </motion.div> :

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentWishes.map((wish) =>
          <WishAdminCard
            key={wish.id}
            wish={wish}
            onApprove={handleApprove}
            onReject={handleReject}
            onRestore={handleRestore}
            onViewVideo={(w) => setSelectedVideo(w)} />

          )}
          </div>
        }
      </main>

      {/* Video Preview Modal */}
      <VideoPreviewModal
        wish={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        onApprove={handleApprove}
        onReject={handleReject} />

    </div>);

}