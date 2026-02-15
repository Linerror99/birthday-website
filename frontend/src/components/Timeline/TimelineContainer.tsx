import React from 'react';
import { motion } from 'framer-motion';
import { TimelineEvent } from './TimelineEvent';
import { timelineEvents } from '../../data/timelineEvents';
export function TimelineContainer() {
  return (
    <div className="relative max-w-6xl mx-auto px-4 py-16">
      {/* Vertical Line - Desktop */}
      <motion.div
        initial={{
          height: 0
        }}
        whileInView={{
          height: '100%'
        }}
        viewport={{
          once: true
        }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut'
        }}
        className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-amber-400 via-rose-400 to-teal-400 hidden md:block"
        style={{
          top: 0
        }} />


      {/* Mobile Line */}
      <motion.div
        initial={{
          height: 0
        }}
        whileInView={{
          height: '100%'
        }}
        viewport={{
          once: true
        }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut'
        }}
        className="absolute left-3 w-1 bg-gradient-to-b from-amber-400 via-rose-400 to-teal-400 md:hidden"
        style={{
          top: 0
        }} />


      {/* Events */}
      <div className="relative">
        {timelineEvents.map((event, index) =>
        <TimelineEvent
          key={event.id}
          event={event}
          index={index}
          isLeft={index % 2 === 0} />

        )}
      </div>
    </div>);

}